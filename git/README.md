#Hello Git World!

##Install Git
[https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Begin by opening a Terminal window

###Starting a new project
	# your directory path
	pwd
	# change directory
	cd Desktop 
	# make directory
	mkdir PROJECT
	cd PROJECT
	# initialize the projet's git repo
	git init
	# create a markdown file called README
	TOUCH README.md


####Commands for making a file
	touch README.md
	> README.md
	cat > README.md
	echo -n > README.md
	printf '' > README.md

####Other options for making a file
	# open the file in a text editor
	open README.md
	
	# type something in the file and save
	
	# back in the Terminal window, 
	# add the changes to the git repo
	git add -A
	# and commit it with a comment
	git commit -m "first commit"

	# type more in README and save

	git add -A
	git commit -m "second commit"	
	
	# if you want to go back to the first commit
	# look at your git log
	git log
	
	# find the first commit id, 
	# something like commit d8a151d10f0db7a6a02fa8e436b86b063ab9bf0c
	
	# revert back to the previous state
	git revert --hard <d8a151d10f0db7a6a02fa8e436b86b063ab9bf0c>
	
	git remote add origin https://github.com/JSDiamond/PROJECT.git
	git push origin master


#### Removing files and folders
	touch index.html
	rm index.html
	mkdir contents
	rm -d contents/
	
#### Running a server
	printf '<h1>Hello Web' > index.html
	python -m SimpleHTTPServer
	# you just started a server#
	# open a web browser and go to http://localhost:8000/


##Get Github
[https://github.com/](https://github.com/)

#### Clone a repo
	# return to Desktop directory 
	cd ~/Desktop
	# clone a repo from github
	# git clone <repo web address> 
	# the web adress is ont he main repo page
	git clone https://github.com/JSDiamond/Dataviz101.git
	
#### Forking, branching, and other wonders

[https://try.github.io](https://try.github.io)

[http://learntocodewith.me/tutorials/github-pages/](http://learntocodewith.me/tutorials/github-pages/)

####Create a Gist
[https://gist.github.com/](https://gist.github.com/)


