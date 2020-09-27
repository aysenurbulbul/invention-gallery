**INVENTION GALLERY**
---

Assignment for ceng495 course. The assignment's details can be seen in `Hw2.pdf`

Heroku link: https://inventiongallery.herokuapp.com/

This application is implemented using [React](https://tr.reactjs.org/) in the front-end and [Node.js](https://nodejs.org/en/) in the back-end.

To run the application in local: 

* First install dependencies. Under `the2` folder and `the2/gallery` folder run this command separately:
```
$ npm install
```

* Then to start the app under 'the2' folder run this command which both runs the front-end and the back-side concurrently thanks to a package named [concurrently](https://www.npmjs.com/package/concurrently):
```
$ npm run dev
```

**Database Design Choices**
---
The schemas for models are under `the2/models` folder. I created 3 models: `User`, `Invention` and `Rate`.

* `User` model has 3 fields. `username` field's type is `String` and it has to be unique. `avg_rating` is for average rating of a user from her/his inventions. 
`gallery` field holds inventions.

* `Invention` model has 9 fields. `product_name`, `cost` ,`materials` ,`inventor` fields are self-explanatory. 
`product_name` should be unique. `photo` is for image's URL. `rating` holds average rating of that invention. 
`date` field is for holding post date of the invention. `exhibit` field's type is boolean and it shows whether or not the invention is dropped from the gallery.
`optinals` field's type is object, it has 2 key-value pairs to hold optional elements that can be added by users.

* `Rate` model has 4 fiels are all self-explanatory: `rater`, `product_name`, `inventor` and `rating`. 
Rates are taken by server as PUT requests and calculating average of ratings operation is done there. 
These request operations can be seen under `the2/routes/api.js` file.

**User Guide**
---
* Home page has 3 options: `Add User`, `Delete User` and `Login`. You can add a new user, delete any user and login as any user.

* After logging as a user, user's page shows 5 elements: `Username`, `Average Rating` of that user, `Exhibit` for adding a new invention as that user,
`Drop` for dropping inventions that user has added before and `Rate` for exploring all inventions that are sent by all users.

*  By clicking `Add invention` button under `Exhibit` section, user can fill a form to add a new invention. Forms fields have descriptions. 
Also, user can add 2 optional fields. User should give fields' names first then enter their values. 
`Submit` button is not active until user fills main fields.

* By clicking `Drop invention` button under `Drop` section, user can see her/his added inventions. 
By clicking `Drop from gallery` button, user can drop that invention from gallery.
Dropped inventions have `Dropped, Exhibit Again` button to put inventions gallery again.
 
 * By clicking `Go to Gallery` button under `Rate` section, users can see all inventions. They showed with their name, inventor and a thumbnail for picture. 
By clicking `Take a Look!` button users can see inventions properties. Also users can vote inventions by clicking stars. 
After rating inventions page reloads and invention's and inventor's rate are get updated.
 
 * Clicking username redirects to that user's page.
