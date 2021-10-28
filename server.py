from http.client import responses
import os

from werkzeug.exceptions import HTTPException
from werkzeug.exceptions import NotFound
try:
    from werkzeug.middleware.shared_data import SharedDataMiddleware
except ImportError:
    from werkzeug.wsgi import SharedDataMiddleware
from werkzeug.routing import Map
from werkzeug.routing import Rule
from werkzeug.urls import url_parse
from werkzeug.utils import redirect
from werkzeug.wrappers import Request
from werkzeug.wrappers import Response

class Application:
    def __init__(self):
        self.url_map = Map(
            [
                Rule("/", endpoint="index"),
                Rule("/products", endpoint="products"),
                Rule("/add_to_cart", endpoint="add_to_cart"),
                Rule("/update_cart", endpoint="update_cart"),
                Rule("/checkout", endpoint="checkout"),
                Rule("/confirm_order", endpoint="confirm_order"),
            ]
        )

    def __call__(self, environ, start_response):
        return self.dispatch(environ, start_response)

    def dispatch(self, environ, start_response):
        request = Request(environ)
        adapter = self.url_map.bind_to_environ(request.environ)
        try:
            endpoint, values = adapter.match()
            response = getattr(self, endpoint)(request, **values)
            return response(environ, start_response)
        # except NotFound:
        #     return self.error_404()
        except HTTPException as e:
            return e

    def index(self, request):
        print ("current directory ::: ", os.getcwd())
        html = open("templates/index.html", 'r').read()
        return Response(html, mimetype='text/html')

    def products(self):
        pass

    def add_to_cart(self):
        pass

    def update_cart(self):
        pass

    def checkout(self):
        pass

    def confirm_order(self):
        pass

def create_app():
    app = Application()
    app.dispatch = SharedDataMiddleware(
        app.dispatch, {"/static": os.path.join(os.path.dirname(__file__), "static")}
    )
    return app

if __name__ == "__main__":
    from werkzeug.serving import run_simple

    application = create_app()
    run_simple("127.0.0.1", 8000, application, use_debugger=True, use_reloader=True)