var youtube = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUKcmljayByb29sbA%3D%3D";
var password = "fkjava";
var github = "https://github.com/tmilka";
var discord = "";
var email = 'mailto:';

var webhome     = "../index.html"; 
var webprojects = "../projects.html";     
var webgallery  = "../gallery.html";     
var webaboutme  = "../about.html";


navbar = [
    "<br>",
    '<a href="'+ webhome +'">[Home]</a>     <a href="'+ webprojects +'">[Projects]</a>     <a href="'+ webgallery +'">[Gallery]</a>     <a href="'+ webaboutme +'">[About Me]</a>',
    "</br>"
]

whois = [
  "<br>",
  "Hey, I'm Tim!👋",
  "a 24-year-old from Bonn. After completing my Abitur at Bertolt",
  "Brecht Gesamtschule, I'm now training as a Fachinformatiker at Deutsche Telekom AG.",
  "I’m passionate about technology and enjoy the challenges of my apprenticeship. Bonn,",
  "with its rich culture and history, remains close to my heart. I’m excited to continue",
  "growing professionally and personally, embracing new opportunities along the way.",
  "Thanks for learning a bit about my journey!",
  "<br>"
];

whoami = [
  "<br>",
  "The paradox of “Who am I?” is: we never know, but, we constantly find out.",
  "<br>"
];

social = [
  "<br>",
  'youtube        <a href="' + youtube + '" target="_blank">youtube/' + "</a>",
  'github         <a href="' + github + '" target="_blank">github/tmilka' + "</a>",
  'discord        <a href="' + discord + '" target="_blank">discord/timiy' + "</a>",
  "<br>"
];

secret = [
  "<br>",
  '<span class="command">sudo</span>           Only use if you\'re admin',
  "<br>"
];

projects = [
  "<br>",
  "Still curating... most projects are offline, on GitHub, or confidential.",
  "<br>"
];

help = [
  "<br>",
  '<span class="command">whois</span>          Who is Tim?',
  '<span class="command">whoami</span>         Who are you?',
  '<span class="command">video</span>          View YouTube videos',
  '<span class="command">social</span>         Display social networks',
  '<span class="command">secret</span>         Find the password',
  '<span class="command">projects</span>       View coding projects',
  '<span class="command">history</span>        View command history',
  '<span class="command">help</span>           You obviously already know what this does',
  '<span class="command">email</span>          Do not email me',
  '<span class="command">clear</span>          Clear terminal',
  '<span class="command">banner</span>         Display the header',
  '<span class="command">navbar</span>         Shows the navbar',
  "<br>",
];

banner = [
    '<span class="index">Tim´s Terminal (TT) Not A Corporation. All knights reserved.</span>',
    '<pre>',
    "                                  _________  ___  _____ ______   ________   ", 
    "             _..._               |\___   ___\\  \|\   _ \  _   \|\   ____\   ",
    "           .'     '.      _      \|___ \  \_\ \  \ \  \\\__\ \  \ \  \___|_   ", 
    "          /    .-++-\   _/ \          \ \  \ \ \  \ \  \\|__| \  \ \_____  \   ",
    "        .-|   /:.   |  |   |           \ \  \ \ \  \ \  \    \ \  \|____|\  \   ",
    "        |  \  |:.   /.-'-./             \ \__\ \ \__\ \__\    \ \__\____\_\  \   ",
    "        | .-'-;:__.'    =/               \|__|  \|__|\|__|     \|__|\_________\   ",
    "        .'=  *=|NASA _.='                                           \|_________|   ",
    "       /   _.  |    ;",
    "      ;-.-'|    \   |             ________  ________  ________  ________  _______   ",
    "     /   | \    _\  _\           |\   ____\|\   __  \|\   __  \|\   ____\|\  ___ \   ",
    "     \__/'._;.  ==' ==\          \ \  \___|\ \  \|\  \ \  \|\  \ \  \___|\ \   __/|   ",   
    "              \    \   |          \ \_____  \ \   ____\ \   __  \ \  \    \ \  \_|/__   ",
    "              /    /   /           \|____|\  \ \  \___|\ \  \ \  \ \  \____\ \  \_|\ \   ",
    "              /-._/-._/              ____\_\  \ \__\    \ \__\ \__\ \_______\ \_______\   ",
    "              \   `\  \             |\_________\|__|     \|__|\|__|\|_______|\|_______|   ",
    "               `-._/._/             \|_________|   ",
    '</pre>',
    '<span class="color2">Welcome to my interactive web terminal.</span>',
    "<span class=\"color2\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color2\">.</span>",
];