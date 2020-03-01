### My Blog Project

This is a web blog project which utilizes Django as a powerful back-end REST API, React-Redux & material-ui as front-end framework. In order to bring the project alive, I deployed it on AWS Ubuntu 16.04 LTS server using Nginx and Gunicorn. You can find it on [http://liangrui.xyz](liangrui.xyz) which links to my blog demo.

#### Key features

- [x] User profile view.
- [x] Post category view.
- [x] Recommended posts and post list view.
- [x] Post list ordering.
- [x] Post detail view.
- [x] Post detail hit counts.
- [x] Post detail render markdown and enable hightlighting.
- [x] Post detail generate table of content dynamically.
- [x] Cache api feches and scroll position for each page.

You can clone the project by running:
```shell
git clone https://github.com/Liang-Rui/Blog-Project.git
```

#### Start back-end server

1. Then setup virtual environment for the project:
```shell
cd Blog-Project/backend/src
virtualenv env .
source env/bin/activate
```

2. Install project backend dependencies:
```shell
(env)$ pip install ../requirements.txt
```

3. Initialize Django apps:
```shell
(env)$ python manage.py makemigrations
(env)$ python manage.py migrate
(env)$ python manage.py collectstatic
(env)$ python manage.py createsuperuser
(env)$ python manage.py runserver
```

4. You can add some posts to the databse on ```http://127.0.0.1:8000/admin``` for testing.

#### Start front-end server

1. Install node modules:
```shell
cd BlogProject/frontend/
npm install
```

2. Start server:
```shell
npm start
```
Then you can play around with the project on ```http://localhost:3000/```.