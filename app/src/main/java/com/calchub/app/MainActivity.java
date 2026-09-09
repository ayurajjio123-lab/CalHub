package com.calchub.app;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.JavascriptInterface;

import android.app.Activity;
import android.os.Build;
import android.graphics.Color;
import android.view.View;
import android.view.Window;

public class MainActivity extends Activity {
    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();
        window.setStatusBarColor(Color.rgb(248, 245, 239));
        window.setNavigationBarColor(Color.rgb(248, 245, 239));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            int flags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
            window.getDecorView().setSystemUiVisibility(flags);
        }

        webView = new WebView(this);
        webView.addJavascriptInterface(new SystemBarBridge(), "CalcHubAndroid");
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.setBackgroundColor(Color.TRANSPARENT);
        setContentView(webView);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            getWindow().setStatusBarColor(Color.rgb(7, 9, 13));
            getWindow().setNavigationBarColor(Color.rgb(7, 9, 13));
            webView.setOnApplyWindowInsetsListener((v, insets) -> {
                android.graphics.Insets bars = insets.getInsets(android.view.WindowInsets.Type.systemBars());
                v.setPadding(0, bars.top, 0, bars.bottom);
                return insets;
            });
        } else {
            webView.setFitsSystemWindows(true);
        }

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);

        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        webView.loadUrl("file:///android_asset/index.html");
    }

    public final class SystemBarBridge {
        @JavascriptInterface
        public void setSystemBarsLight(final boolean light) {
            runOnUiThread(() -> {
                Window window = getWindow();
                if (light) {
                    window.setStatusBarColor(Color.rgb(247, 245, 241));
                    window.setNavigationBarColor(Color.rgb(247, 245, 241));
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        int flags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                            flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                        }
                        window.getDecorView().setSystemUiVisibility(flags);
                    }
                } else {
                    window.setStatusBarColor(Color.rgb(7, 9, 13));
                    window.setNavigationBarColor(Color.rgb(7, 9, 13));
                    window.getDecorView().setSystemUiVisibility(0);
                }
            });
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
