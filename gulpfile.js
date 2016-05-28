var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var minifyCSS    = require('gulp-clean-css');
var minifyHTML   = require('gulp-minify-html');
var uglify       = require('gulp-uglify');
var uncss        = require('gulp-uncss');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var replace      = require('gulp-replace');
var notify       = require('gulp-notify');
var prefix       = require('gulp-autoprefixer');
var cp           = require('child_process');
var fs           = require('fs');
var ghPages      = require('gulp-gh-pages');
var jekyll       = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages     = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build', '--config', '_config.dev.yml'], {stdio: 'inherit'})
        .on('close', done);
});



/**
 * Rebuild Jekyll & do page reload
 */
 gulp.task('jekyll-rebuild', ['optimize-html'], function () {
     browserSync.reload();
 });

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['optimize-html'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('optimize-css', ['jekyll-build'], function () {
    return gulp.src('_site/css/main.css')
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('_site/public/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('public/css'))
        .pipe(notify({ message: 'CSS task complete' }));
});


gulp.task('optimize-js', ['optimize-css'], function() {
  return gulp.src('js/*.js')
    .pipe(concat('all.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('_site/public/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'JS task complete' }));
});

gulp.task('optimize-html', ['optimize-js'], function() {
	return gulp.src('_site/**/*.html')
		.pipe(gulp.dest('_site/'))
    .pipe(notify({ message: 'HTML task complete' }));
});

/**
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['_sass/*.scss',
                'css/*.scss',
                'js/*.js',
                '*.html',
                '_layouts/*.html',
                '_includes/*.html',
                '_includes/*.svg',
                '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);



/**
* Create production-ready website
*/
gulp.task('jekyll-build-prod', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build', '--config', '_config.prod.yml'], {stdio: 'inherit'})
        .on('close', done);
});
gulp.task('optimize-css-prod', ['jekyll-build-prod'], function () {
    return gulp.src('_site/css/main.css')
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(uncss({
           html: ['_site/**/*.html'],
           ignore: []
       }))
        .pipe(rename('all.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('_site/public/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('public/css'))
        .pipe(notify({ message: 'CSS-PROD task complete' }));
});
gulp.task('optimize-js-prod', ['optimize-css-prod'], function() {
  return gulp.src('js/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('_site/public/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'JS-PROD task complete' }));
});
gulp.task('optimize-html-prod', ['optimize-js-prod'], function() {
	return gulp.src('_site/**/*.html')
  .pipe(minifyHTML({
    quotes: true
  }))
		.pipe(replace(/<link rel=\"stylesheet\" href=\"\/public\/css\/all.min.css\"[^>]*>/, function(s) {
			var style = fs.readFileSync('_site/public/css/all.min.css', 'utf8');
			return '<style>' + style + '</style>';
		}))
		.pipe(replace(/<script src=\"\/public\/js\/all.min.js\"[^>]*><\/script>/, function(s) {
			var js_script = fs.readFileSync('_site/public/js/all.min.js', 'utf8');
			return '<script type="text/javascript">' + js_script + '</script>';
		}))
		.pipe(gulp.dest('_site/'))
    .pipe(notify({ message: 'HTML-PROD task complete' }));
});
gulp.task('push-to-gh-pages', ['optimize-html-prod'], function() {
  return gulp.src('./_site/**/*')
    .pipe(ghPages());
});
gulp.task('deploy',
  ['jekyll-build-prod',
    'optimize-css-prod',
    'optimize-js-prod',
    'optimize-html-prod',
    'push-to-gh-pages']);
