# Defrag Identicon
Enter your GitHub handle and then enter the associated letters to defrag your identicon.

Click [HERE](https://g-url.github.io/Defrag-Identicon/) to defrag your identicon!

### Instructions
* Enter your GitHub handle and press the 'Fetch Identicon!' button.
* Enter the letters associated with colour or negative-space (not both!) and click the 'Defrag Identicon!' button.

### History and Motivation
Watching the defragmenter was a favourite part of my childhood! Years ago I was feeling nostalgic and decided to defragment my identicon by hand using GIMP. I always liked how it looked but thought it would be more interesting if I could automate the process.

### Built With
* [React](https://reactjs.org/) - UI JavaScript Library
* [GIMP](https://www.gimp.org/) - artwork
* [XAMPP](https://www.apachefriends.org/index.html) - Web server

### Getting Started
1. Clone the repo.
```
git clone https://github.com/g-URL/Defrag-Identicon.git
```

2. Setup a local web server.

To run the game locally, you will need to setup a local web server and adjust the root/directory from the default to your Git directory. I used [XAMPP](https://www.apachefriends.org/index.html). For other options or additional information the [Getting Started with Phaser 3](https://phaser.io/tutorials/getting-started-phaser3/part2) tutorial is very helpful.

Using XAMPP, configure the httpd.conf file:
```
#DocumentRoot "C:/xampp/htdocs"
DocumentRoot "C:/Users/Your-Name/Documents/GitHub/Defrag-Identicon"
#<Directory "C:/xampp/htdocs">
<Directory "C:/Users/Your-Name/Documents/GitHub/Defrag-Identicon">
```
3. Run the web server and in the address bar of your internet browser type 'localhost'.

### References 
* https://github.blog/2013-08-14-identicons/

### Future Work
1. Improve user experience so that letters don't need to be entered manually.