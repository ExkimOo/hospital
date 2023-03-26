from django.contrib import admin
from django.urls import path, include
from django.urls import re_path as url
from backend_api.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/audit/', AuditView.as_view(), name='audit_view'),
    path('api/user/', UserView.as_view(), name='user_view'),
    path('api/doctor/', DoctorView.as_view(), name='doctor_view'),
    path('api/patient/', PatientView.as_view(), name='patient_view'),
    path('api/room/', RoomView.as_view(), name='room_view'),
    path('api/schedule/', ScheduleView.as_view(), name='schedule_view'),
    path('api/diagnosis/', DiagnosisView.as_view(), name='diagnosis_view'),
]
