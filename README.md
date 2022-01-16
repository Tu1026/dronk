# DrinkSafeApp

### App description
Dronk is a react native app, fully functional on iOS and Android, designed with the goal of making a night out safer and more responsible. Our app takes 2 different approaches to achieve this. A common mistake university students make with drinking is losing track of how much they’ve had and as a result, often consuming more than their limit. Using a simple one-click feature, users can easily input their drink count for the night to track their drinking habits and determine their limits. Using a Django REST API, Dronk has a built-in buddy system which allows its users to form a group for an event then alert group members when someone has strayed away, or remind them if they are leaving a friend behind. Losing a friend at a party is one of the most stressful things that can happen on a night out, so a simple alert to text or call your friends will go a long way in making the night safer and more enjoyable for everyone.


### Quick Start

#### Front end
Make sure you have node.js
git clone the respository and run

```
npm install
expo start
```
#### Back End
cd into getHomeSafeAPI
Change the IP address to your hosting machine
```
pipenv install
pipenv run manage.py runserver 0.0.0.0:<port of your choice>
```

### Tech Stacks
We used react-native for the front end user interface. The application is available on both ios and android.

The backend we django-restful framework to host the apis. We used both a digital ocean virtual machine and rasberry pi to host our apis
