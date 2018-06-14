---
layout: post
title:  "Python, Virtual Environments, and pyenv: Explained"
date:   2018-06-13 22:26:00
category: [python, linux]
---
On a recent client project I was required to set up a [Python][python] development environment on a [CentOS 7][centos] virtual machine. I haven't had to work with Python since version 2.3, so I was basically starting from scratch as far as prior knowledge went. I'm generally pretty good at figuring things out and following instructions, but my gosh what a mess!

Between the system insisting that there are no newer versions of Python past 2.7.5 (there's a reason for this that I'll detail in a moment, but the actual latest is currently 3.6.5) and every other blog post and documentation page I could find telling me to do different things to set it up, I don't know how anyone can call Python "a language for beginners".

I ended up spending three days trying to get the system to work without it complaining pip wasn't installed or that I didn't have permission to do something. Many blog posts, [Stack Overflow][stack-overflow] questions, and re-created virtual machines later I finally got it working and (I think) I understand how everything fits together. My stance on it now? The way Python handles environments is pretty clever and powerful once you get it set up, but getting it to that point is a nightmare!

For those of you who are as lost as I was, let me explain all the pieces to you in simple, understandable terms. Then I'll make a second post that shows you step by step how to get this all up and running slick as a whistle.

# Python

Let's talk about Python. You may have seen in various guides that the Python executable is referred to differently depending on which tutorial you're reading. It can be either `python` or `python#` where `#` is seemingly any arbitrary number. Basically, because Python comes pre-installed in many Linux distributions, a number of system and third-party scripts started relying on it. The executable at that time was `python`. This persisted up until Python 2.x. When Python 3.0 was released, the parser changed fairly significantly. Rather than trying to handle versioning in a scalable, future-proof way, the Python developers decided that the Python 3.x executable would be named `python3`.

Here is where things get tricky. Because some distributions wanted to update to Python 3, but wanted their existing scripts to continue working, they aliased `python` to resolve into `python3`. This, apparently, broke things. So Python released an [official statement][python-naming-recommendation] saying that `python` should always refer to Python 2.x and that distributions should use `python#` to refer to a specific version installation. But, each distribution interprets the `#` differently, so Python 3.6.5 can be any of `python`, `python3`, `python36`, `python365`, `python3.6` (yes, the executable has a dot in the filename), or `python3.6.5`. As a commonly installed module, `pip` follows this same convention and has the same problem. Interestingly, a growing contingent of users are beginning to frown on the use of `pip install <package>`, instead perferring the more direct `python -m pip install <package>`. I suspect this is because depending on your system setup, `python` and `pip` may reference different versions of Python, which won't do what you think it does.

# Virtual Environments

To make matters worse, there is also a potential conflict with dependency versions. Assume, for example, that your Linux distribution has a dependency on [pyzip][pyzip] 0.1. You want to use pyzip 0.2 in your scripts, so you `pip install --upgrade pyzip`. One of two things happens here:

1. It throws an error while updating and you are effectively stuck with pyzip 0.1.
2. It upgrades pyzip to 0.2 and your system becomes unstable.

Obviously, these are both bad outcomes. In order to handle this, Python came up with the concept of *Virtual Environments*. Basically, a virtual environment is a sandbox. You select which environment you want to use, then you can install, upgrade, or uninstall any dependencies you want without regard for anything else on the system. It is all kept separate. You can create a new virtual environment just for your current project and the entire Python installation will be completely unaware of any dependencies (or versions thereof) of any other project as well as the system itself. This is where [virtualenv][virtualenv] comes in. `virtualenv` is an extension included with later versions of Python that allows you to create, delete, and manage these virtual environments. There is a catch though, it can only do so within a single Python version installation. So you still need separate `python` and `python3` executables, and separate sets of virtual environments for each.

# pyenv

Enter [pyenv][pyenv]. `pyenv` is a `virtualenv` wrapper. When installed properly, `pyenv` adds a shim which basically takes over your system's `python` and `pip` commands. `pyenv` then allows you to manage your virtual environments as well as all your Python versions all from a single executable. You can install new versions of Python, create new virtual environments for different projects, and never need to worry about what `#` to stick on the end of your `python` call or where Python is installed to ever again. You always call `python` or `pip`, then `pyenv` will automatically route your request to the correct version, installation, and set of dependencies for what you are doing.

Note the words "when installed properly". Apparently, `pyenv` is particularly difficult to install by hand. Thus a sister project, [pyenv-installer][pyenv-installer] was born. It seems, though, that the installation instructions provided on the `pyenv-installer` don't actually work. I will walk you through the correct way of installing it in the next post.

So I hope that helps clear all that up. Python, like most scripting languages, is a hot mess of libraries with obtuse names and wrappers upon wrappers upon wrappers, and most documentation assumes you have intimate knowledge of not just Python, but half the libraries involved. It can be very difficult to find your footing and much of the community documentation that is out there is long out of date. The information is there if you're willing to dig, and my goal is to do some of that excavation so you don't have to.

~ S

[python]: https://www.python.org/
[centos]: https://www.centos.org/
[stack-overflow]: https://stackoverflow.com/
[python-naming-recommendation]: https://www.python.org/dev/peps/pep-0394/
[pyzip]: https://github.com/ipazc/pyzip
[virtualenv]: https://virtualenv.pypa.io/en/stable/
[pyenv]: https://github.com/pyenv/pyenv
[pyenv-installer]: https://github.com/pyenv/pyenv-installer