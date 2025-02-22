from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import User
import json
from django.http import JsonResponse

def indexUsers(request):
    users = User.objects.all()
    return render(request, 'users/index.html', {'users': users})

def createUserView(request):
    return render(request,"users/create.html")

def createUserByFetch(request):
    body_unicode = request.body.decode("utf-8")
    body = json.loads(body_unicode)
    return JsonResponse({   
        "NOMBRE_RECIBIDO" : body.get("name")
    })

def createUser(request):
    data = {}
    try: 
        if request.method == "POST":
            name = request.POST.get("name")
            email = request.POST.get("email")
            age = request.POST.get("age")
            rfc = request.POST.get("rfc")
            photo = request.POST.get("photo")

            user = User(name=name, email=email, age=age, rfc=rfc, photo=photo)
            user.save()
            data["user"]=user
            data["message"] = "User created"
            data["status"] = "success"
    except Exception as e:
        data["message"]= str(e)
        data["status"]= "error"


        return render(request, "users/create.html", data)

def userDetail(request, id):
    user = get_object_or_404(User, id=id)
    #user = User.objects.get(id=id)
    data = {
        "user": user
    }
    return render(request, "users/detail.html",data)



def edit_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    return render(request, 'users/edit_user.html', {'user': user})


from django.shortcuts import redirect

def update_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if request.method == 'POST':
        user.name = request.POST['name']
        user.email = request.POST['email']
        user.age = request.POST['age']
        user.rfc = request.POST['rfc']
        user.photo = request.POST['photo']
        user.save()
        return redirect('index')