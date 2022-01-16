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

### Video Demos
https://www.youtube.com/watch?v=ZXtcEl-eP98

### Screen Demos
![image](https://user-images.githubusercontent.com/64434778/149676765-ea0613cf-fbf7-467d-bd52-205c95b16969.png)
![image](https://user-images.githubusercontent.com/64434778/149676777-5d790521-850e-4ac8-99a6-56b8464c8247.png)
![image](https://user-images.githubusercontent.com/64434778/149676785-c3b6eb5b-cea3-43d2-a85b-457b7f3daf98.png)
![image](https://user-images.githubusercontent.com/64434778/149676803-7da29fd5-c8b1-43ed-a97f-805f38cf57f1.png)
![image](https://user-images.githubusercontent.com/64434778/149676805-170f7bab-1806-4efb-92d9-cb618b6db1fc.png)
![image](https://user-images.githubusercontent.com/64434778/149676817-ac282899-2cce-442f-bf85-96e31b6ca871.png)
![image](https://user-images.githubusercontent.com/64434778/149676820-592436d2-0772-48c9-89f8-4466602fcd67.png)
![image](https://user-images.githubusercontent.com/64434778/149676830-8c3d94f8-c9bd-4d9d-8c8d-c0e93e67170b.png)




