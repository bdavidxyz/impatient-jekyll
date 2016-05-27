
<p align="center">

<img align="center" src="http://res.cloudinary.com/toutuncafe/image/upload/c_scale,w_62/v1464290677/going-to-work_xpo4ji.svg"
width="121" alt="impatient">

</p>



<h1 align="center">Impatient-Jekyll</h1>
<p align="center">Jekyll is the most awesome & most used static website generator. But 1) Default dev workflow is **slow** 2) Generated website is **not optimized**</p>
<p align="center">Impatient-Jekyll is the perfect solution to this 2 problems.</p>



## How to use it

### Prerequisite


 - [Chrome](https://www.google.com/chrome/) - use the installer
 - [Jekyll](https://jekyllrb.com/) - ```$ gem install jekyll```
 - [NodeJS](https://nodejs.org/en/download/) - use the installer.
 - [GulpJS](http://gulpjs.com/GulpJS) - ```$ npm install -g gulp ```

### Dev mode

```shell

$ git clone https://github.com/davidb583/impatient-jekyll
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
$ git push -u origin master

# I suppose you've already run npm install ?
$ gulp deploy
# ta-da ! your super optimized website
# can be see at  https://<your_github_name>/<your_repo_name>/
```


## How to customize it

There are very minor change compared to plained old Jekyll.

 - A gulpfile.js has been added
 - In config.yml, node artifact have been excluded from jekyll build
 - One line has been added to _layout/default.html in order to include the concatenated javascript.
 - Default CSS inclusion in _includes/head.html has been modified to allow inclusion of minified CSS.
 - A folder named "js" contains all javascript files you want.


 That's all ! So diving into source code to get the featurette you want should not be a big deal. If it is, just write me an email, I'll be glad to help you : davbohr at gmail dot com

## Limitations

As you may have noticed, the build does treat image. I strongly recommend the 2 following options :
- Rely on an external service like [cloudinary](https://cloudinary.com/)
- Use SVG as much as possible

Remember that speed is the goal of the tool:)

## Special Thanks

I used the following resources to achieve the tools :

 - [Dimitri Koenig, Scoring 100 on google's page speed insights]( https://www.dimitrikoenig.net/scoring-100-on-googles-pagespeed-insights.html)
 - [Shane Osbourne, jekyll-gulp-sass-browser-sync](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync)
 - [Aaron Lasseigne, using gulp with jekyll](http://aaronlasseigne.com/2016/02/03/using-gulp-with-jekyll/)
 - [Elle Kasai, Shiori theme](https://github.com/ellekasai/shiori)
 - [freepik from Flaticon, authored the icon](http://www.flaticon.com/authors/freepik)
