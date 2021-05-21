---
layout: post
title:  "Python and pyenv: In Practice"
date:   2018-07-03 10:55:00
categories: [python]
redirect_to: https://drakmyth.com/blog/2018/07/03/python-and-pyenv-in-practice/
---
If you're looking for an explanation of what all the moving parts are, make sure to read [the previous post on this topic][part1]. If you're ready to fire up your terminal and get your Python environment set up once and for all, read on!

A few details before we start:
* We're going to assume you're working in a Linux environment. While pyenv may still be helpful on Windows, Windows is much better at handling multiple Python installs.
* As to which particular flavor of Linux, we'll be using CentOS 7. By and large this shouldn't really matter, except that you'll need to use your distribution's package manager of choice. For us, it's `yum` but you may use `apt`, `zypper`, `pacman`, `emerge`, `dnf`, or something else entirely. The process should be roughly the same, but some of the package names may differ.
* The pyenv setup and configuration utilizes bash scripts, so we will be using the bash shell for this guide. I'm not familiar with other shells, so I can't say how much work it would be to modify those scripts to run in other shells.

**Update 2018-07-10:** *My understanding of pyenv was slightly mistaken. pyenv is a bash extension, thus it cannot be run on Windows or in a shell other than bash. The majority of the functionality pyenv provides is implemented into Python itself as of version 3.3, so the virtual environment handling is available cross-platform/shell, but the ability to work across Python versions (including versions prior to 3.3) and to automatically enable and disable environments on a per directory basis is pyenv exclusive as far as I know.*

With all that settled, let's open up a terminal and get started!

CentOS, like most Linux distributions, comes with Python pre-installed. However, it has become best practice to basically never use this installation. It's being used by the operating system, and updating or installing modules could potentially interfere with its operation. So we're going to take some minimally invasive steps to separate ourselves from it.

``` shell
$ sudo yum -y install gcc zlib-devel bzip2 bzip2-devel readline-devel sqlite sqlite-devel openssl-devel xz xz-devel tk-devel libffi-devel python-pip
```

**Update 2018-07-21:** *Added a few potentially missing dependencies. See [https://github.com/pyenv/pyenv/wiki][pyenv-wiki] for the list of dependencies you should install for your particular linux distribution.*

This will install a number of libraries that Python and/or pyenv need in order to run properly. Of particular note here is `python-pip`. Pip is the Python-specific package manager. It's actually invoked by calling Python and passing a particular parameter string, but many tutorials will invoke it directly. This package provides a simple alias to allow you to do that. If you want to skip this step and invoke Pip using the Python executable, you can do so with the command:

``` shell
$ python -m pip install <package>
```

Next we'll upgrade pip to the latest version.

``` shell
$ sudo pip install --upgrade pip
```

**Note**: In general, you shouldn't have to sudo every command. If you do, either your permissions are not configured appropriately, or you're doing something you probably shouldn't be doing. Here, we only use sudo when dealing with the system installation of Python. When dealing with pyenv or any installation of Python installed by pyenv, you should explicitly **NOT** use sudo. Using sudo when executing a non-system pip, for example, may install packages to the wrong installation of Python.

At this point, there is one last step to take before we are done messing with the built-in version of Python: installing pyenv. pyenv works by replacing the Python executables with proxy shims that will redirect your commands to the correct Python installation. It does this in such a way that the operating system won't know it's happening, and thus it shouldn't have any effect on the system's operation.

``` shell
$ curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
```

This downloads and executes the pyenv-installer script which installs pyenv and those shims. The final step to getting pyenv up and running is to open the `~/.bashrc` file and add the following lines to the bottom of it:

{%- highlight shell linenos -%}
export PATH=$HOME/.pyenv/bin:$PATH

eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
{%- endhighlight -%}

This adds pyenv to the beginning of your PATH and runs some initialization scripts any time you open a terminal. Now close the terminal and open a new one so that these initialization scripts run, and that's it! pyenv is installed! There is one final thing we want to do though. I mentioned before that best practice is to not touch the system installation of Python. With pyenv, we can take steps to make sure we don't accidently do that. On CentOS, the system version of Python is 2.7.5. What we can do is install a separate copy of Python 2.7.5 and tell pyenv that we want to use that if no other environment is specified. That way if we accidently install or upgrade something outside of a virtual environment, it will use this second installation and not our system one.

``` shell
$ pyenv install 2.7.5
$ pyenv global 2.7.5
```

Since we haven't used Python 2.7.5 from within pyenv before, the first line tells Python to go ahead and create its own installation of 2.7.5. The second line says that when we're not using any other virtual environment, we should use this one. Now we are completely decoupled from the system installation. Now, let's say we want to start a new project using Python 3.6.5. Since we haven't installed Python 3.6.5 before, we tell pyenv to do so:

``` shell
$ pyenv install 3.6.5
```

And then we create a new virtual environment for our particular project. This allows us to use the same Python version for multiple projects, but also ensures our installed dependencies and versions won't interfere across projects. We tell pyenv to name our virtual environment "myproject" and that we want to use Python version 3.6.5.

``` shell
$ pyenv virtualenv 3.6.5 myproject
```

Now you can switch to this environment to work on your project

``` shell
$ pyenv activate myproject
```

and you can be sure that anything you do won't have any impact on any other project or installation on your machine! Bonus: when you go to use `python` or `pip`, you can just run that command. No more `python2`, `python3`, `python36`, etc.! Just make sure that when you're done working on your project that you deactivate your environment

``` shell
$ pyenv deactivate
```

so that you don't accidently mess it up in the meantime.

pyenv has one other really cool trick that you'll want to use. Let's say you have a handful of different projects using various Python versions and dependencies. This all works fine because each project has its own virtual environment. But it's a hassle having to manually enable and disable the environments since you're working on all the projects at the same time, and you have to remember to do actually do that. Well, pyenv can help you out here. You can mark a particular directory as using a particular environment, then any python commands you execute from within that directory (or any of its children) will automatically use the correct environment! You can set this up by navigating to your project's root directory and running:

``` shell
$ pyenv local myproject
```

This will create a `.python-version` file in this directory, which is what pyenv uses to know it needs to automatically change the virtual environment! Make sure to add this to your .gitignore or otherwise exclude this file from your source control.

And there you have it! You're all set up and ready to write some Python! It's actually not that complicated of a process, and the possibilities and workflows it opens up are pretty powerful, but most of the documentation around this process is scattered, broken, out of date, or just otherwise woefully lacking. If you have any questions or run into any trouble, please leave a comment below. Otherwise, enjoy writing some Python!

~ S

[part1]: {{ site.baseurl }}{% post_url 2018-06-13-python-virtual-environments-and-pyenv-explained %}

[pyenv-wiki]: https://github.com/pyenv/pyenv/wiki
{:target="_blank"}