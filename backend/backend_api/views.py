from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from backend_api.models import Audit, Room, User, Doctor, Patient, Schedule, Diagnosis
from backend_api.serializers import AuditSerializer, DoctorSerializer, PatientSerializer, DiagnosisSerializer, ScheduleSerializer, \
    ScheduleSerializer, UserSerializer, RoomSerializer


class AuditView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "user": output.user,
                "action": output.action,
                "table": output.table,
                "created": output.created
            } for output in Audit.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = AuditSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class UserView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "login": output.login,
                "password": output.password,
                "role": output.role,
                "created": output.created,
                "active": output.active
            } for output in User.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class DoctorView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "birthdate": output.birthdate,
                "name": output.name,
                "specialization": output.specialization,
                "created": output.created,
                "userid": output.userid
            } for output in Doctor.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class PatientView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "gender": output.gender,
                "insurance": output.insurance,
                "passport": output.passport,
                "name": output.name,
                "phone": output.phone,
                "created": output.created,
                "birthdate": output.birthdate,
                "userid": output.userid
            } for output in Patient.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class RoomView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "number": output.number,
                "name": output.name,
                "created": output.created
            } for output in Room.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class ScheduleView(APIView):
    def get(self, request):
        output = [
            {
                "doctorid": output.doctorid,
                "roomid": output.roomid,
                "id": output.id,
                "worktime": output.worktime,
                "days": output.days
            } for output in Schedule.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = ScheduleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class DiagnosisView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "patientid": output.patientid,
                "doctorid": output.doctorid,
                "disease": output.disease,
                "visitdate": output.visitdate
            } for output in Diagnosis.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = DiagnosisSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
