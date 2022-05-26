from urllib import response
import six, spacy, os, csv, json
from google.cloud import translate_v2 as translate
from urllib.request import urlopen

from backend.forms import NewUserForm
from backend.models import Account, UserProfile
from backend.models import EnSent, CnSent, EsSent, HiSent, BnSent, PtSent, RuSent, JpSent, TrSent, KoSent, FrSent, DeSent, FaSent, ArSent, IdSent, NlSent
from backend.models import SenCard, ReadTable, SaveTable, LikeTable, ReportTable
from backend.HE_CERF import getCERF
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.views.decorators.csrf import ensure_csrf_cookie
from backend.serializer import AccountSerializer, SenCardSerializeer
from django.core.paginator import Paginator
from django.core.mail import send_mail
from django.conf import settings
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from django.db.models import Sum

@api_view(['GET', 'POST'])
@ensure_csrf_cookie
def translateView(request):
    user = request.user
    if not user.is_authenticated:
        raise AuthenticationFailed('Unauthenticated...')
    

    if request.method == 'GET':
        return Response({"data": 'This is a response from translateView.'})
    elif request.method == 'POST':
        SITE_ROOT = os.path.dirname(os.path.realpath(__file__))
        translate_client = translate.Client()
        text = request.data['data']
        if isinstance(text, six.binary_type):
            text = text.decode("utf-8")
        result = translate_client.translate(text, target_language='zh-CN')
        translations = {"cn": result["translatedText"]}
        if result["detectedSourceLanguage"] == 'en':
            result = translate_client.translate(text, target_language='ja')
            translations["jp"] = result["translatedText"]
            result = translate_client.translate(text, target_language='fa')
            translations["fa"] = result["translatedText"]
            result = translate_client.translate(text, target_language='es')
            translations["es"] = result["translatedText"]
            result = translate_client.translate(text, target_language='hi')
            translations["hi"] = result["translatedText"]
            result = translate_client.translate(text, target_language='bn')
            translations["bn"] = result["translatedText"]
            result = translate_client.translate(text, target_language='pt')
            translations["pt"] = result["translatedText"]
            result = translate_client.translate(text, target_language='ru')
            translations["ru"] = result["translatedText"]
            result = translate_client.translate(text, target_language='tr')
            translations["tr"] = result["translatedText"]
            result = translate_client.translate(text, target_language='ko')
            translations["ko"] = result["translatedText"]
            result = translate_client.translate(text, target_language='fr')
            translations["fr"] = result["translatedText"]
            result = translate_client.translate(text, target_language='de')
            translations["de"] = result["translatedText"]
            result = translate_client.translate(text, target_language='ar')
            translations["ar"] = result["translatedText"]
            result = translate_client.translate(text, target_language='id')
            translations["id"] = result["translatedText"]
            result = translate_client.translate(text, target_language='nl')
            translations["nl"] = result["translatedText"]

            nlp = spacy.load("en_core_web_sm")
            doc = nlp(text)
            expertAI = []
            for token in doc:
                expertAI.append({"lemma": token.lemma_,
                                "text": token.text,
                                 "CERF": getCERF(token.lemma_),
                                 "pos": token.pos,
                                 "morph": token.morph,
                                 })

            return Response({"translations": translations, "expertAI": expertAI})

        else:
            return Response({"result", "ERROR"})


@api_view(['POST'])
def SubmitCard(request):
    user = request.user
    if not user.is_authenticated:
        raise AuthenticationFailed('Unauthenticated...')

    enSentObj, created = EnSent.objects.get_or_create(
        text=request.data['sent'])
    message = ""
    try:
        cnSentObj = CnSent.objects.get(ensent=enSentObj, user=user)
        if cnSentObj.text != request.data['translations']['cn']:
            cnSentObj.text = request.data['translations']['cn']
            cnSentObj.save()
            message = "Translation updated"
    except:
        CnSent.objects.create(
            text=request.data['translations']['cn'], ensent=enSentObj, user=user, point=1)
    try:
        esSentObj = EsSent.objects.get(ensent=enSentObj, user=user)
        if esSentObj.text != request.data['translations']['es']:
            esSentObj.text = request.data['translations']['es']
            esSentObj.save()
            message = "Translation updated"
    except:
        EsSent.objects.create(
            text=request.data['translations']['es'], ensent=enSentObj, user=user, point=1)
    try:
        hiSentObj = HiSent.objects.get(ensent=enSentObj, user=user)
        if hiSentObj.text != request.data['translations']['hi']:
            hiSentObj.text = request.data['translations']['hi']
            hiSentObj.save()
            message = "Translation updated"
    except:
        HiSent.objects.create(
            text=request.data['translations']['hi'], ensent=enSentObj, user=user, point=1)
    try:
        bnSentObj = BnSent.objects.get(ensent=enSentObj, user=user)
        if bnSentObj.text != request.data['translations']['bn']:
            bnSentObj.text = request.data['translations']['bn']
            bnSentObj.save()
            message = "Translation updated"
    except:
        BnSent.objects.create(
            text=request.data['translations']['bn'], ensent=enSentObj, user=user, point=1)
    try:
        ptSentObj = PtSent.objects.get(ensent=enSentObj, user=user)
        if ptSentObj.text != request.data['translations']['pt']:
            ptSentObj.text = request.data['translations']['pt']
            ptSentObj.save()
            message = "Translation updated"
    except:
        PtSent.objects.create(
            text=request.data['translations']['pt'], ensent=enSentObj, user=user, point=1)
    try:
        ruSentObj = RuSent.objects.get(ensent=enSentObj, user=user)
        if ruSentObj.text != request.data['translations']['ru']:
            ruSentObj.text = request.data['translations']['ru']
            ruSentObj.save()
            message = "Translation updated"
    except:
        RuSent.objects.create(
            text=request.data['translations']['ru'], ensent=enSentObj, user=user, point=1)
    try:
        jpSentObj = JpSent.objects.get(ensent=enSentObj, user=user)
        if jpSentObj.text != request.data['translations']['jp']:
            jpSentObj.text = request.data['translations']['jp']
            jpSentObj.save()
            message = "Translation updated"
    except:
        JpSent.objects.create(
            text=request.data['translations']['jp'], ensent=enSentObj, user=user, point=1)
    try:
        trSentObj = TrSent.objects.get(ensent=enSentObj, user=user)
        if trSentObj.text != request.data['translations']['tr']:
            trSentObj.text = request.data['translations']['tr']
            trSentObj.save()
            message = "Translation updated"
    except:
        TrSent.objects.create(
            text=request.data['translations']['tr'], ensent=enSentObj, user=user, point=1)
    try:
        koSentObj = KoSent.objects.get(ensent=enSentObj, user=user)
        if koSentObj.text != request.data['translations']['ko']:
            koSentObj.text = request.data['translations']['ko']
            koSentObj.save()
            message = "Translation updated"
    except:
        KoSent.objects.create(
            text=request.data['translations']['ko'], ensent=enSentObj, user=user, point=1)
    try:
        frSentObj = FrSent.objects.get(ensent=enSentObj, user=user)
        if frSentObj.text != request.data['translations']['fr']:
            frSentObj.text = request.data['translations']['fr']
            frSentObj.save()
            message = "Translation updated"
    except:
        FrSent.objects.create(
            text=request.data['translations']['fr'], ensent=enSentObj, user=user, point=1)
    try:
        deSentObj = DeSent.objects.get(ensent=enSentObj, user=user)
        if deSentObj.text != request.data['translations']['de']:
            deSentObj.text = request.data['translations']['de']
            deSentObj.save()
            message = "Translation updated"
    except:
        DeSent.objects.create(
            text=request.data['translations']['de'], ensent=enSentObj, user=user, point=1)
    try:
        faSentObj = FaSent.objects.get(ensent=enSentObj, user=user)
        if faSentObj.text != request.data['translations']['fa']:
            faSentObj.text = request.data['translations']['fa']
            faSentObj.save()
            message = "Translation updated"
    except:
        FaSent.objects.create(
            text=request.data['translations']['fa'], ensent=enSentObj, user=user, point=1)
    try:
        arSentObj = ArSent.objects.get(ensent=enSentObj, user=user)
        if arSentObj.text != request.data['translations']['ar']:
            arSentObj.text = request.data['translations']['ar']
            arSentObj.save()
            message = "Translation updated"
    except:
        ArSent.objects.create(
            text=request.data['translations']['ar'], ensent=enSentObj, user=user, point=1)
    try:
        idSentObj = IdSent.objects.get(ensent=enSentObj, user=user)
        if idSentObj.text != request.data['translations']['id']:
            idSentObj.text = request.data['translations']['id']
            idSentObj.save()
            message = "Translation updated"
    except:
        IdSent.objects.create(
            text=request.data['translations']['id'], ensent=enSentObj, user=user, point=1)
    try:
        nlSentObj = NlSent.objects.get(ensent=enSentObj, user=user)
        if nlSentObj.text != request.data['translations']['nl']:
            nlSentObj.text = request.data['translations']['nl']
            nlSentObj.save()
            message = "Translation updated"
    except:
        NlSent.objects.create(
            text=request.data['translations']['nl'], ensent=enSentObj, user=user, point=1)

    try:
        senCard, cardCreated = SenCard.objects.get_or_create(
            Qtext=request.data['Qtext'],
            Atext=request.data['Atext'],
            CERF=request.data["CERF"],
            morph=request.data["morph"],
            user=user,
            sent=enSentObj)
    except:
        return Response({"message": 'card already exists'})

    if message:
        return Response({"message": message})

    if cardCreated:
        return Response({"message": 'card created'})
    else:
        return Response({"message": 'card already exists'})


@api_view(['POST'])
def SaveCard(request):
    user = request.user
    if user.is_authenticated:
        userProf = UserProfile.objects.filter(user=user).first()
        card = SenCard.objects.filter(id=request.data['id']).first()
        if request.data['save'] == False:
            SaveTable.objects.get_or_create(userProf=userProf, card=card)
            return Response({"message": "Successfully added to the saved card list"})
        else:
            SaveTable.objects.get(userProf=userProf, card=card).delete()
            return Response({"message": "Successfully removed from the saved cards list"})
    else:
        raise AuthenticationFailed('Unauthenticated...')


@api_view(['POST'])
def LikeCard(request):
    user = request.user
    if user.is_authenticated:
        card = SenCard.objects.filter(id=request.data['id']).first()
        if request.data['like'] == False:
            LikeTable.objects.get_or_create(user=user, card=card)
            return Response({"message": f"Successfully liked the card number {card.id}."})
        else:
            LikeTable.objects.get(user=user, card=card).delete()
            return Response({"message": f"Successfully unliked the card number {card.id}."})
    else:
        raise AuthenticationFailed('Unauthenticated...')


@api_view(['POST'])
def ReadCard(request):
    user = request.user
    if user.is_authenticated:
        card = SenCard.objects.filter(id=request.data['id']).first()
        userProf = UserProfile.objects.filter(user=user).first()
        if request.data['read'] == False:
            ReadTable.objects.get_or_create(userProf=userProf, card=card)
            message = f"Successfully read the card number {card.id}."
            return Response({"message": message})
        else:
            ReadTable.objects.get(userProf=userProf, card=card).delete()
            message = f"Successfully unread the card number {card.id}."
            return Response({"message": message})
    else:
        raise AuthenticationFailed('Unauthenticated...')


@api_view(['POST'])
def ScoreTrans(request):
    user = request.user
    if not user.is_authenticated:
        raise AuthenticationFailed('Unauthenticated...')

    if user.language == 'ar':
        tran = ArSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "bn":
        tran = BnSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "cn":
        tran = CnSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "de":
        tran = DeSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "es":
        tran = EsSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "fa":
        tran = FaSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "fr":
        tran = FrSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "hi":
        tran = HiSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "id":
        tran = IdSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "jp":
        tran = JpSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "ko":
        tran = KoSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "nl":
        tran = NlSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "pt":
        tran = PtSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "ru":
        tran = RuSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    elif user.language == "tr":
        tran = TrSent.objects.get(id=request.data['id'])
        tran.point = request.data['point']
        tran.save()
    message = f"{request.data['id']} point set to {request.data['point']}"
    return Response({"message": message})


@api_view(['POST'])
def AddTrans(request):
    user = request.user
    if not user.is_authenticated:
        raise AuthenticationFailed('Unauthenticated...')

    ensent = EnSent.objects.get(pk=request.data["ensentid"])

    try:
        if user.language == 'ar':
            ArSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "bn":
            BnSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "cn":
            CnSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "de":
            DeSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "es":
            EsSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "fa":
            FaSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "fr":
            FrSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "hi":
            HiSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "id":
            IdSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "jp":
            JpSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "ko":
            KoSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "nl":
            NlSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "pt":
            PtSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "ru":
            RuSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        elif user.language == "tr":
            TrSent.objects.update_or_create(user=user, ensent=ensent, defaults={
                                            "text": request.data['text'], 'point': 1})
        message = "Trnaslation successfully added."
    except:
        message = "Failed to add transltion."
    return Response({"message": message})


@api_view(['POST'])
def CheatedCardView(request):
    try:
        sen = SenCard.objects.filter(id=request.data['id']).first()
        sen.reviewed = sen.reviewed + 1
        sen.save()
        message = 'cheated'
        return Response({"message": message})
    except:
        message = 'Failed to add review to card'
        return Response({"message": message})


@api_view(['POST'])
def SucceededCardView(request):
    try:
        sen = SenCard.objects.filter(id=request.data['id']).first()
        sen.reviewed = sen.reviewed + 1
        sen.succeed = sen.succeed + request.data['point']
        sen.ansrate = sen.succeed / sen.reviewed
        sen.save()
        message = "Reviewed"
        return Response({"message": message})
    except:
        message = "Failed to add review"
        return Response({"message": message})


# @api_view(['POST'])
# def ReportCardView(request):
#     token = request.COOKIES.get('jwt')
#     if not token:
#         raise AuthenticationFailed('Unauthenticated...')

#     try:
#         payload = jwt.decode(token, 'secret', algorithms=['HS256'])
#     except jwt.ExpiredSignatureError:
#         raise AuthenticationFailed('Unauthenticated...')

#     try:
#         user = Account.objects.filter(id=payload['id']).first()
#         card = SenCard.objects.filter(id=request.data['id']).first()
#         report = ReportTable.objects.create(
#             user=user, card=card, text=request.data['text'])
#         return Response({"message": "Report submitted."})
#     except:
#         return Response({"message": "Couldn't submit the report."})


@api_view(['POST', 'DELETE'])
def DeleteCardView(request):
    user = request.user
    if not user.is_authenticated:
        raise AuthenticationFailed('Unauthenticated...')

    try:
        id = request.data['id']
        message = f"Card {id} deleted."
        card = SenCard.objects.filter(id=id).delete()
        return Response({"message": message})
    except:
        id = request.data['id']
        card = SenCard.objects.filter(id=id).first()
        message = f"Couldn't delete the card {id}."
        return Response({"message": message})


@api_view(['POST'])
def SendContactMessage(request):
    title = request.data['name']
    message = request.data['email'] + "\n" + request.data['message']
    send_mail(title, message,
              settings.EMAIL_HOST_USER, ['blankuapp@gmail.com'])
    return Response({"message": "message sent"})


@api_view(['GET'])
def downloadView(request, BeginingID, EndingID):
    if request.user.username == "hamedo":
        response = HttpResponse(
            content_type='text/csv',
            headers={
                'Content-Disposition': 'attachment; filename="somefilename.csv"'},
        )
        cards = SenCard.objects.filter(id__gte=BeginingID, id__lte=EndingID)
        user = Account.objects.filter(username="hamedo").first()
        seri = SenCardSerializeer(cards, user=user, many=True)
        writer = csv.writer(response)
        for ser in seri.data:
            writer.writerow(
                [ser['id'], ser['full_text'], ser['Qtext'], ser['Atext'], ser['trans'][0]['text']])

        return response
    else:
        return Response({"message": "not accessible"})


@api_view(['GET'])
def HomeView(request):
    root = request.GET.get("root")
    if not (root in ["home", "myCards", "recentlyRead", "savedCards"]):
        root = "home"
    order = request.GET.get("order")
    if not (order in ["trikiest", "newest", "oldest", "random"]):
        order = "random"
    read = request.GET.get("read")
    if not (read in ["all", "readOnly", "unread"]):
        read = "all"
    page = request.GET.get("page")
    if page == None:
        page = 1
    else:
        page = int(page)

    if order == "random":
        m_order = "?"
    elif order == "newest":
        m_order = "-id"
    elif order == "oldest":
        m_order = "id"
    elif order == "trikiest":
        m_order = "ansrate"

    user = request.user
    Lang = "es"
    if request.session.has_key('Lang'):
        Lang = request.session['Lang']

    if not request.user.is_authenticated:
        if Lang == "cn":
            user = Account.objects.get_or_create(
                email='cnguest@b.com', username='cnguest', language='cn', password='cnguest')[0]
        elif Lang == "hi":
            user = Account.objects.get_or_create(
                email='higuest@b.com', username='higuest', language='hi', password='higuest')[0]
        elif Lang == "bn":
            user = Account.objects.get_or_create(
                email='bnguest@b.com', username='bnguest', language='bn', password='bnguest')[0]
        elif Lang == "jp":
            user = Account.objects.get_or_create(
                email='jpguest@b.com', username='jpguest', language='jp', password='jpguest')[0]
        elif Lang == "ru":
            user = Account.objects.get_or_create(
                email='ruguest@b.com', username='ruguest', language='ru', password='ruguest')[0]
        elif Lang == "fa":
            user = Account.objects.get_or_create(
                email='faguest@b.com', username='faguest', language='fa', password='faguest')[0]
        elif Lang == "ar":
            user = Account.objects.get_or_create(
                email='arguest@b.com', username='arguest', language='ar', password='arguest')[0]
        elif Lang == "de":
            user = Account.objects.get_or_create(
                email='deguest@b.com', username='deguest', language='de', password='deguest')[0]
        elif Lang == "fr":
            user = Account.objects.get_or_create(
                email='frguest@b.com', username='frguest', language='fr', password='frguest')[0]
        elif Lang == "id":
            user = Account.objects.get_or_create(
                email='idguest@b.com', username='idguest', language='id', password='idguest')[0]
        elif Lang == "ko":
            user = Account.objects.get_or_create(
                email='koguest@b.com', username='koguest', language='ko', password='koguest')[0]
        elif Lang == "nl":
            user = Account.objects.get_or_create(
                email='nlguest@b.com', username='nlguest', language='nl', password='nlguest')[0]
        elif Lang == "pt":
            user = Account.objects.get_or_create(
                email='ptguest@b.com', username='ptguest', language='pt', password='ptguest')[0]
        elif Lang == "tr":
            user = Account.objects.get_or_create(
                email='trguest@b.com', username='trguest', language='tr', password='trguest')[0]
        else:
            user = Account.objects.get_or_create(
                email='esguest@b.com', username='esguest', language='es', password='esguest')[0]

    userProf, temp = UserProfile.objects.get_or_create(user=user)

    if root == "home":
        read_ids = []
        if read != "all":
            read_items = ReadTable.objects.select_related(
                'card').filter(userProf=userProf)
            for read_item in read_items:
                read_ids.append(read_item.id)
        else:
            items = SenCard.objects.all()

        if read == "readOnly":
            items = SenCard.objects.filter(id__in=read_ids)

        if read == "unread":
            items = SenCard.objects.all()
            items = items.exclude(id__in=read_ids)

        items = items.order_by(m_order)

    if root == 'myCards':
        items = SenCard.objects.filter(
            user=user).order_by(m_order)

    if root == 'recentlyRead':
        if m_order == 'id':
            items = SenCard.objects.filter(readtable__userProf=userProf).all().order_by(
                'readtable__date_read').reverse()
        elif m_order == '-id':
            items = SenCard.objects.filter(
                readtable__userProf=userProf).all().order_by('readtable__date_read')
        else:
            items = SenCard.objects.filter(
                readtable__userProf=userProf).all().order_by('?')

    if root == 'saved':
        if m_order == 'id':
            items = SenCard.objects.filter(savetable__userProf=userProf).all().order_by(
                'savetable__date_saved').reverse()
        elif m_order == '-id':
            items = SenCard.objects.filter(
                savetable__userProf=userProf).all().order_by('savetable__date_saved')
        else:
            items = SenCard.objects.filter(
                savetable__userProf=userProf).all().order_by('?')
    
    p = Paginator(items, 5)

    if page in p.page_range:
        pageSet = p.page(page)

    seri = SenCardSerializeer(pageSet, user=user, many=True)
    seriJson = json.dumps(seri.data)

    

    response = render(request, "home.html", context={"data": seriJson, "hasNext": pageSet.has_next(), "page": page,
                           "root": root, "order": order, "read": read})
    if request.user.is_authenticated:
        response.set_cookie('Lang', user.language)

    return response

@api_view(['GET'])
def MyCardsView0(request):
    order = request.GET.get("order")
    if not (order in ["newest", "oldest", "random"]):
        order = "random"
    page = request.GET.get("page")
    if page == None:
        page = 1
    else:
        page = int(page)

    if order == "newest":
        m_order = "-id"
    elif order == "oldest":
        m_order = "id"
    else:
        m_order = "?"

    queryset = SenCard.objects.filter(
        user=request.user).order_by(m_order)
    p = Paginator(queryset, 10)

    if page in p.page_range:
        pageSet = p.page(page)

    seri = SenCardSerializeer(pageSet, user=request.user, many=True)
    seriJson = json.dumps(seri.data)

    return render(request, "mycards.html", context={"data": seriJson, "hasNext": pageSet.has_next(), "order": order, "page": page})


@api_view(['GET'])
def RecentlyReadView0(request):
    order = request.GET.get("order")
    if not (order in ["newest", "oldest", "random"]):
        order = "random"
    page = request.GET.get("page")
    if page == None:
        page = 1
    else:
        page = int(page)

    if order == "newest":
        m_order = "-id"
    elif order == "oldest":
        m_order = "id"
    else:
        m_order = "?"

    userProf = UserProfile.objects.get_or_create(user=request.user)[0]

    if m_order == 'id':
        queryset = SenCard.objects.filter(readtable__userProf=userProf).all().order_by(
            'readtable__date_read').reverse()
    elif m_order == '-id':
        queryset = SenCard.objects.filter(
            readtable__userProf=userProf).all().order_by('readtable__date_read')
    else:
        queryset = SenCard.objects.filter(
            readtable__userProf=userProf).all().order_by('?')

    p = Paginator(queryset, 10)

    if page in p.page_range:
        pageSet = p.page(page)

    seri = SenCardSerializeer(pageSet, user=request.user, many=True)
    seriJson = json.dumps(seri.data)

    return render(request, "recentlyread.html", context={"data": seriJson, "hasNext": pageSet.has_next(), "order": order, "page": page})


@api_view(['GET'])
def SavedCardsView0(request):
    order = request.GET.get("order")
    if not (order in ["newest", "oldest", "random"]):
        order = "random"
    page = request.GET.get("page")
    if page == None:
        page = 1
    else:
        page = int(page)

    if order == "newest":
        m_order = "-id"
    elif order == "oldest":
        m_order = "id"
    else:
        m_order = "?"

    userProf = UserProfile.objects.get_or_create(user=request.user)[0]

    if m_order == 'id':
        queryset = SenCard.objects.filter(readtable__userProf=userProf).all().order_by(
            'savetable__date_saved').reverse()
    elif m_order == '-id':
        queryset = SenCard.objects.filter(
            readtable__userProf=userProf).all().order_by('savetable__date_saved')
    else:
        queryset = SenCard.objects.filter(
            readtable__userProf=userProf).all().order_by('?')

    p = Paginator(queryset, 10)

    if page in p.page_range:
        pageSet = p.page(page)

    seri = SenCardSerializeer(pageSet, user=request.user, many=True)
    seriJson = json.dumps(seri.data)

    return render(request, "savedcards.html", context={"data": seriJson, "hasNext": pageSet.has_next(), "order": order, "page": page})


@api_view(['GET'])
def SingleCardView0(request, number):
    user = request.user
    guestLang = "es"
    if request.session.has_key('Lang'):
        guestLang = request.session['Lang']

    if not request.user.is_authenticated:
        if guestLang == "cn":
            user = Account.objects.get_or_create(
                email='cnguest@b.com', username='cnguest', language='cn', password='cnguest')[0]
        elif guestLang == "hi":
            user = Account.objects.get_or_create(
                email='higuest@b.com', username='higuest', language='hi', password='higuest')[0]
        elif guestLang == "bn":
            user = Account.objects.get_or_create(
                email='bnguest@b.com', username='bnguest', language='bn', password='bnguest')[0]
        elif guestLang == "jp":
            user = Account.objects.get_or_create(
                email='jpguest@b.com', username='jpguest', language='jp', password='jpguest')[0]
        elif guestLang == "ru":
            user = Account.objects.get_or_create(
                email='ruguest@b.com', username='ruguest', language='ru', password='ruguest')[0]
        elif guestLang == "fa":
            user = Account.objects.get_or_create(
                email='faguest@b.com', username='faguest', language='fa', password='faguest')[0]
        elif guestLang == "ar":
            user = Account.objects.get_or_create(
                email='arguest@b.com', username='arguest', language='ar', password='arguest')[0]
        elif guestLang == "de":
            user = Account.objects.get_or_create(
                email='deguest@b.com', username='deguest', language='de', password='deguest')[0]
        elif guestLang == "fr":
            user = Account.objects.get_or_create(
                email='frguest@b.com', username='frguest', language='fr', password='frguest')[0]
        elif guestLang == "id":
            user = Account.objects.get_or_create(
                email='idguest@b.com', username='idguest', language='id', password='idguest')[0]
        elif guestLang == "ko":
            user = Account.objects.get_or_create(
                email='koguest@b.com', username='koguest', language='ko', password='koguest')[0]
        elif guestLang == "nl":
            user = Account.objects.get_or_create(
                email='nlguest@b.com', username='nlguest', language='nl', password='nlguest')[0]
        elif guestLang == "pt":
            user = Account.objects.get_or_create(
                email='ptguest@b.com', username='ptguest', language='pt', password='ptguest')[0]
        elif guestLang == "tr":
            user = Account.objects.get_or_create(
                email='trguest@b.com', username='trguest', language='tr', password='trguest')[0]
        else:
            user = Account.objects.get_or_create(
                email='esguest@b.com', username='esguest', language='es', password='esguest')[0]

    try:
        query = SenCard.objects.get(id=int(number))
        words = query.Atext.split()
        dics = []
        for word in words:
            DicResponse = urlopen("https://api.dictionaryapi.dev/api/v2/entries/en/"+word)
            DicJson = json.loads(DicResponse.read())
            for deff in DicJson:
                dics.append(deff)
        seri = SenCardSerializeer(query, user=user)
        seriJson = json.dumps(seri.data)
        return render(request, "singleCard.html", {"data": seriJson, "Atext": query.Atext, "Qtext": query.Qtext, "cardId": query.id, "dics": json.dumps(dics), "ndics": dics})
    except:
        return Response({"data": "Not found", "answer": "Not found", "user": user})


@api_view(['GET'])
def CreateCard0(request):
    return render(request, "createCard.html")


@api_view(['GET'])
def PrivacyView(request):
    return render(request, "Privacy.html")


@api_view(['GET'])
def CookiesView(request):
    return render(request, "Cookies.html")


@api_view(['GET'])
def ToCView(request):
    return render(request, "ToC.html")


@api_view(['GET'])
def AboutView(request):
    numQuestions = SenCard.objects.all().count()
    numReviews = SenCard.objects.all().aggregate(Sum('reviewed'))
    numUsers = Account.objects.all().count()
    return render(request, "About.html", context={"questions":numQuestions, "reviews":numReviews['reviewed__sum'], "users":numUsers})

@api_view(['GET'])
def ContactUsView(request):
    return render(request, "ContactUs.html")

@api_view(['GET', 'POST'])
def RegisterView0(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("/")
    form = NewUserForm()
    return render(request, "registration/register.html", context={"form": form})


@api_view(['GET'])
def SitemapView(request):
    output = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
    <loc>https://www.blanku.me/</loc>
    <lastmod>2022-05-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
</url>
'''

    for card in SenCard.objects.all():
        output += "<url>\n"
        output += f"    <loc>https://www.blanku.me/cards/{card.id}/</loc>\n"
        output += f"    <lastmod>{card.data_created.strftime('%Y-%m-%d')}</lastmod>\n"
        output += "    <changefreq>monthly</changefreq>\n"
        output += "</url>\n"

    output += "</urlset>"
    with open("./static/sitemap2.xml", "w") as f:
        f.write(output)

    return HttpResponse(output, content_type='text/plain')

def SetGuest(request):
    Lang = request.GET.get('Lang')
    request.session['Lang'] = Lang
    response = redirect("/")
    response.set_cookie('Lang', Lang)
    return response