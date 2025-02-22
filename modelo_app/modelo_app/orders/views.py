from django.shortcuts import render
from django.http import HttpResponse
from .models import Question


def indexOrders(request):
    questions  = Question.objects.all()
    data = {
        "questions": questions, 
       "titulo":"Index de orders por varible", 
       "total_orders":100,
       "total_payments": 200,
       "orders":[
           {
               "id":1, "age":100,"name":"Carlos Eduardo","image":"https://media.istockphoto.com/id/2161765195/photo/a-smiling-man-working-over-the-laptop-at-the-office.jpg?s=1024x1024&w=is&k=20&c=JNz97YVBteawk9cn5WgFrVPeI2ks0BvMTRtCBQHIEVg="
           },
           {
               "id":2, "age":200, "name":"Maria Fernanda","image":"https://media.istockphoto.com/id/2073254261/photo/an-adult-man-is-using-his-smartphone.jpg?s=1024x1024&w=is&k=20&c=xNIjvUR3J7C1fFcCbjq_syI3rDb0loJ_xyvDkZx7PCU="
           },
           {
                "id":3, "age":300, "name":"Juan Carlos",    "image":"https://media.istockphoto.com/id/2161765195/photo/a-smiling-man-working-over-the-laptop-at-the-office.jpg?s=1024x1024&w=is&k=20&c=JNz97YVBteawk9cn5WgFrVPeI2ks0BvMTRtCBQHIEVg="
           },
           {
                "id":4, "age":400, "name":"Luisa Fernanda", "image":"https://media.istockphoto.com/id/2073254261/photo/an-adult-man-is-using-his-smartphone.jpg?s=1024x1024&w=is&k=20&c=xNIjvUR3J7C1fFcCbjq_syI3rDb0loJ_xyvDkZx7PCU="
           },
                     {
               "id":1, "age":100,"name":"Carlos Eduardo","image":"https://media.istockphoto.com/id/2161765195/photo/a-smiling-man-working-over-the-laptop-at-the-office.jpg?s=1024x1024&w=is&k=20&c=JNz97YVBteawk9cn5WgFrVPeI2ks0BvMTRtCBQHIEVg="
           },
           {
               "id":2, "age":200, "name":"Maria Fernanda",  "image":"https://media.istockphoto.com/id/2073254261/photo/an-adult-man-is-using-his-smartphone.jpg?s=1024x1024&w=is&k=20&c=xNIjvUR3J7C1fFcCbjq_syI3rDb0loJ_xyvDkZx7PCU="
           },
           {
                "id":3, "age":300, "name":"Juan Carlos",   "image":"https://media.istockphoto.com/id/2161765195/photo/a-smiling-man-working-over-the-laptop-at-the-office.jpg?s=1024x1024&w=is&k=20&c=JNz97YVBteawk9cn5WgFrVPeI2ks0BvMTRtCBQHIEVg="
           },
           {
                "id":4, "age":400, "name":"Luisa Fernanda", "image":"https://media.istockphoto.com/id/2073254261/photo/an-adult-man-is-using-his-smartphone.jpg?s=1024x1024&w=is&k=20&c=xNIjvUR3J7C1fFcCbjq_syI3rDb0loJ_xyvDkZx7PCU="
           },
                     {
               "id":1, "age":100,"name":"Carlos Eduardo", "image":"https://media.istockphoto.com/id/2161765195/photo/a-smiling-man-working-over-the-laptop-at-the-office.jpg?s=1024x1024&w=is&k=20&c=JNz97YVBteawk9cn5WgFrVPeI2ks0BvMTRtCBQHIEVg="
           },
           {
               "id":2, "age":200, "name":"Maria Fernanda", "image":"https://media.istockphoto.com/id/2073254261/photo/an-adult-man-is-using-his-smartphone.jpg?s=1024x1024&w=is&k=20&c=xNIjvUR3J7C1fFcCbjq_syI3rDb0loJ_xyvDkZx7PCU="
           },
           {
                "id":3, "age":300, "name":"Juan Carlos",   "image":"https://media.istockphoto.com/id/2161765195/photo/a-smiling-man-working-over-the-laptop-at-the-office.jpg?s=1024x1024&w=is&k=20&c=JNz97YVBteawk9cn5WgFrVPeI2ks0BvMTRtCBQHIEVg="
           },
           {
                "id":4, "age":400, "name":"Luisa Fernanda", "image":"https://media.istockphoto.com/id/2073254261/photo/an-adult-man-is-using-his-smartphone.jpg?s=1024x1024&w=is&k=20&c=xNIjvUR3J7C1fFcCbjq_syI3rDb0loJ_xyvDkZx7PCU="
           }
       ]    
    }
    return render(request, 'orders/index.html',data)


def paymentsByOrder(request):
    return render(request, 'orders/payments.html')

def ordersIndex(request):
    return render(request,"orders/index.html")