




<h1 align="center">Impatient-Jekyll</h1>
<div align="center">Opinionated Jekyll starter kit</div><div align="center">Get a fast local workflow, and a strongly optimized website in production.</div>



## [View demos and full documentation &rarr;](http://bdavidxyz.github.io/impatient-jekyll)

## How to use it

### Prerequisite


 - [Chrome](https://www.google.com/chrome/) - use the installer
 - [Jekyll](https://jekyllrb.com/) - ```$ gem install jekyll```
 - [NodeJS](https://nodejs.org/en/download/) - use the installer.
 - [GulpJS](http://gulpjs.com/GulpJS) - ```$ npm install -g gulp ```


Versions I used : node 5.11.1, npm 3.8.6, gulp 3.9.1, jekyll 3.1.6, ruby 2.3.0

### Dev mode

```shell

$ git clone https://github.com/bdavidxyz/impatient-jekyll
$ cd impatient-jekyll
$ npm install
$ gulp
 # ta-da ! the browser launches itself,
 # and will rebuild and live-reload each time you
 # change a CSS, JS, or HTML file
```

### Production mode

The website will deploy on branch gh-pages, so create a new repository <your_repo_name> in Github, and add the remote in your project like this :


```shell

# be sure you start from a fresh GitHub state
$ rm -rf .git
$ git init
$ git add . && git commit -m 'initial commit'
$ git remote add origin git@github.com:<your_github_name>/<your_repo_name>.git
# in config.prod.yml, set baseurl to <your_repo_name>
$ git push -u origin master

# I suppose you've already run npm install ?
$ gulp deploy
# ta-da ! your super optimized website
# can be see at  https://<your_github_name>/<your_repo_name>/
```

## Special Thanks

I used the following resources to achieve the tools :

 - [Dimitri Koenig, Scoring 100 on google's page speed insights]( https://www.dimitrikoenig.net/scoring-100-on-googles-pagespeed-insights.html)
 - [Shane Osbourne, jekyll-gulp-sass-browser-sync](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync)
 - [Aaron Lasseigne, using gulp with jekyll](http://aaronlasseigne.com/2016/02/03/using-gulp-with-jekyll/)
 - [Elle Kasai, How to market micro open-source projects](https://speakerdeck.com/ellekasai/how-to-market-micro-open-source-projects)
 - [Christophe Porteneuve, conference@ParisWeb2015](https://www.paris-web.fr/2015/conferences/le-dev-front-a-mach-1-au-quotidien.php)
