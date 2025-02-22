from django.urls import path

from . import views

urlpatterns = [
    path("users", views.indexUsers, name="indexUsers"),
    path("create", views.createUserView, name="createUserView"),
    path("createUser", views.createUser, name="createUser"),
    path("details/<int:id>", views.userDetail, name="userDetail"),
    path("createUser-by-fetch", views.createUserByFetch, name="createUser-by-fetch"),
     path('users/edit/<int:user_id>/', views.edit_user, name='edit_user'),
      path('users/update/<int:user_id>/', views.update_user, name='update_user'),

]