from django.conf import settings
from hub.models import SitewideMessage
import json

def external_service_tokens(request):
    out = {}
    if settings.TRACKJS_TOKEN:
        out['trackjs_token'] = settings.TRACKJS_TOKEN
    if settings.RAVEN_JS_PUBLIC_KEY:
        out['raven_js_public_key'] = settings.RAVEN_JS_PUBLIC_KEY
    if settings.GOOGLE_ANALYTICS_TOKEN:
        out['google_analytics_token'] = settings.GOOGLE_ANALYTICS_TOKEN
    if settings.INTERCOM_APP_ID:
        out['intercom_app_id'] = settings.INTERCOM_APP_ID
    return out


def email(request):
    out = {}
    # 'kpi_protocol' used in the activation_email.txt template
    out['kpi_protocol'] = request.META.get('wsgi.url_scheme', 'http')
    return out


def sitewide_messages(request):
    '''
    required in the context for any pages that need to display
    custom text in django templates
    '''
    if request.path_info.endswith("accounts/register/"):
        try:
            return {
                'welcome_message': SitewideMessage.objects.get(
                    slug='welcome_message').body
            }
        except SitewideMessage.DoesNotExist as e:
            return {}
    return {}
