# Generated by Django 4.1.7 on 2023-03-31 12:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=50, unique=True)),
                ('username', models.CharField(max_length=50)),
                ('role', models.CharField(max_length=100)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Audit',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('action', models.CharField(max_length=30)),
                ('user', models.CharField(max_length=100)),
                ('table', models.CharField(max_length=100)),
                ('created', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('birthdate', models.DateField()),
                ('name', models.CharField(max_length=100)),
                ('specialization', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('number', models.BigIntegerField()),
                ('name', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('worktime', models.CharField(max_length=100)),
                ('days', models.CharField(max_length=50)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='backend_api.doctor')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='backend_api.room')),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('gender', models.CharField(max_length=1)),
                ('insurance', models.CharField(max_length=16)),
                ('passport', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=15)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('birthdate', models.DateField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Diagnosis',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('disease', models.CharField(max_length=1000)),
                ('visitdate', models.DateTimeField(auto_now_add=True)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='backend_api.doctor')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='backend_api.patient')),
            ],
        ),
    ]
