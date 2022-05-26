from django.contrib import admin
from .models import SenCard, Account, UserProfile
# Register your models here.

# admin.site.register(SenCard)


@admin.register(SenCard)
class SenCardAdmin(admin.ModelAdmin):
    list_display = ('id', 'Qtext', 'user', 'CERF',
                    'reviewed', 'succeed', 'ansrate', 'data_created')
    ordering = ('data_created',)
    search_fields = ('id', 'Qtext')


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'language',)
    search_fields = ('id', 'email', 'username')


admin.site.register(UserProfile)
