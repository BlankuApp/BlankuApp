from django.urls import path, include
from .views import *

urlpatterns = [
    path('api/translate/', translateView),
    path('api/submitcard/', SubmitCard),
    path('api/savecard/', SaveCard),
    path('api/likecard/', LikeCard),
    path('api/readcard/', ReadCard),
    path('api/scoretrans/', ScoreTrans),
    path('api/addtrans/', AddTrans),
    path('api/cheated/', CheatedCardView),
    path('api/succeeded/', SucceededCardView),
    path('api/deletecard/', DeleteCardView),
    path('api/contactform/', SendContactMessage),
    path('api/download/<int:BeginingID>/<int:EndingID>', downloadView),
    path('api/setLang/', SetGuest),
    path('', HomeView),
    path('MyCards/', MyCardsView0),
    path('RecentlyRead/', RecentlyReadView0),
    path('SavedCards/', SavedCardsView0),
    path('cards/<int:number>/', SingleCardView0),
    path('create/', CreateCard0),
    path('Privacy/', PrivacyView),
    path('Cookies/', CookiesView),
    path('ToC/', ToCView),
    path('About/', AboutView),
    path('ContactUs/', ContactUsView),
    path('', include("django.contrib.auth.urls"),),
    path('Register/', RegisterView0),
    path('sitemap.xml/', SitemapView)
]
