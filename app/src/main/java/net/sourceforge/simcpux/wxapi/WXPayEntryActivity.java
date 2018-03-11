package net.sourceforge.simcpux.wxapi;





import com.alibaba.fastjson.JSONObject;
import com.example.jsen.deliverwater.Constants;
import com.example.jsen.deliverwater.WXApplication;
import com.example.jsen.deliverwater.bus.CommonBusMsg;
import com.example.jsen.deliverwater.weex.WXPageActivity;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import org.greenrobot.eventbus.EventBus;

public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler {

    private static final String TAG = "MicroMsg.SDKSample.WXPayEntryActivity";

    private IWXAPI api;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // setContentView(new LinearLayout(this));

        api = WXAPIFactory.createWXAPI(this, Constants.wxAppID);
        api.handleIntent(getIntent(), this);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        api.handleIntent(intent, this);
    }

    @Override
    public void onReq(BaseReq req) {
    }

    @Override
    public void onResp(BaseResp resp) {
        if (resp.errCode == 0) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("code", 0);
            jsonObject.put("msg", "支付成功");
            EventBus.getDefault().post(new CommonBusMsg(WXPageActivity.PAY_RESULT, jsonObject));
        } else {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("code", 1);
            jsonObject.put("msg", "支付失败");
            EventBus.getDefault().post(new CommonBusMsg(WXPageActivity.PAY_RESULT, jsonObject));
        }
        finish();
        /*
        Log.d(TAG, "onPayFinish, errCode = " + resp.errCode);

        if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
            Log.e("WXResult", resp.errCode + resp.errStr);
        }
        */
    }
}