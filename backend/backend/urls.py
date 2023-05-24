from django.contrib import admin
from django.urls import path, include
from django.urls import re_path as url
from backend_api.views import *
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'user', UserViewSet)
router.register(r'schedule', ScheduleViewSet)

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/register/', UserRegister.as_view(), name='register'),
    path('api/login/', UserLogin.as_view(), name='login'),
    path('api/logout/', UserLogout.as_view(), name='logout'),
    # path('api/user/', UserView.as_view(), name='user'),
    path('api/', include(router.urls)),
    path('api/audit/', AuditView.as_view(), name='audit_view'),
    # path('api/user/', UserViewSet.as_view(), name='user_view'),
    path('api/doctor/', DoctorView.as_view(), name='doctor_view'),
    path('api/patient/', PatientView.as_view(), name='patient_view'),
    path('api/room/', RoomView.as_view(), name='room_view'),
    # path('api/schedule/', ScheduleViewList.as_view(), name='schedule_view'),
    path('api/diagnosis/', DiagnosisView.as_view(), name='diagnosis_view'),
    path('api/userprofile/', UserProfile.as_view(), name='user_profile'),
    path('api/adminaudit', AdminAudit.as_view(), name='admin_audit'),
    path('api/scheduletable', ScheduleTable.as_view(), name='schedule_table'),
    path('api/diagnosisuser', DiagnosisUser.as_view(), name='diagnosis_user'),
]
