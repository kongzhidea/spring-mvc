package com.kk.filter;

import com.kk.utils.UserAgentUtil;
import org.apache.commons.lang.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class UserAgentFilter implements Filter {

	private static Map<String, String> prop = new HashMap<String, String>();

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest _request, ServletResponse _response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) _request;
		HttpServletResponse resp = (HttpServletResponse) _response;

		String uri = req.getRequestURI();
		if (uri.endsWith("/")) {
			uri = uri.substring(0, uri.length() - 1);
		}
		if (prop.containsKey(uri)) {
			if (UserAgentUtil.isWap(req)) {
				String query = req.getQueryString();
				if (StringUtils.isBlank(query)) {
					resp.sendRedirect(prop.get(uri));
				} else {
					resp.sendRedirect(prop.get(uri) + "?"
							+ req.getQueryString());
				}
				return;
			}
		}
		chain.doFilter(_request, _response);
	}

	@Override
	public void destroy() {

	}

}
