addEventListener("fetch", event => {
  event.respondWith(doRedirects(event.request))
})

const redirectLocation = "https://developers.cloudflare.com/workers/about/";

function isRedirect(request) {
  let reqUA = request.headers.get('user-agent');
  if (!reqUA || reqUA === null || reqUA === undefined) {
    return false;
  }
  let cookies = request.headers.get('Cookie') || "";
  if (cookies.includes('cf-noredir=true')) {
    return false;
  }
  
  if (reqUA.match('curl')) {
		return true;
	}
  return false;
}

async function doRedirects(request) {
  if (isRedirect(request)) {
    return Response.redirect(redirectLocation, 302)
  }
	let ret = await fetch(request);
  let response = new Response(ret.body, ret);
  return response;
}
