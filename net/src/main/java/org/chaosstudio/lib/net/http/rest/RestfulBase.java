package org.chaosstudio.lib.net.http.rest;

import android.os.AsyncTask;

import org.chaosstudio.lib.net.http.RequestBase;
import org.chaosstudio.lib.net.http.RequestBuilder;
import org.chaosstudio.lib.net.http.RequestCallBack;
import org.chaosstudio.lib.net.http.pool.SimpleNotifyPool;

import java.util.concurrent.Executor;

/**
 * Created by jsen on 26/09/2016.
 *
 */
public abstract class RestfulBase extends RequestBase {


    public RestfulBase(RequestBuilder builder) {
        super(builder);
    }

    // 执行任务
    public void exec(Executor executor) {
        new DoTask2(requestCallBack).executeOnExecutor(executor);
        // new DoTask1(this).execute();
    }

    // 指通知回调事件
    // public void exec(RequestCallBack requestCallBack) {
    //     new DoTask2(requestCallBack).execute();
    // }



    private static class DoTask1 extends AsyncTask<Void, Integer, InnerMode> {


        private RestfulBase restfulBase;
        public DoTask1(RestfulBase restfulBase) {
            this.restfulBase = restfulBase;
        }

        @Override
        protected InnerMode doInBackground(Void... voids) {
            return restfulBase.handle();
        }

        @Override
        protected void onPostExecute(InnerMode innerMode) {
            // super.onPostExecute(string);
            if (innerMode!=null) {
                if (innerMode.flag == Result.OK) {
                    if (innerMode.data == null && innerMode.heads == null) {
                        SimpleNotifyPool.getSimpleNotifyPool().error(restfulBase.builder.getMsgTag());
                    } else {
                        SimpleNotifyPool.getSimpleNotifyPool().onResult(restfulBase.builder.getMsgTag(), innerMode.data, innerMode.heads);
                    }
                } else if (innerMode.flag == Result.PARSER_ERROR) {
                    SimpleNotifyPool.getSimpleNotifyPool().parserError(restfulBase.builder.getMsgTag());
                } else if (innerMode.flag == Result.HTTP_ERROR) {
                    SimpleNotifyPool.getSimpleNotifyPool().httpError(restfulBase.builder.getMsgTag());
                } else {
                    SimpleNotifyPool.getSimpleNotifyPool().error(restfulBase.builder.getMsgTag());
                }
            } else {
                SimpleNotifyPool.getSimpleNotifyPool().error(restfulBase.builder.getMsgTag());
            }
        }

        @Override
        protected void onProgressUpdate(Integer... values) {
            if (values!=null && values.length>0) {
                SimpleNotifyPool.getSimpleNotifyPool().onProgress(restfulBase.builder.getMsgTag(), values[0]);
            }
        }

        @Override
        protected void onCancelled() {
            SimpleNotifyPool.getSimpleNotifyPool().onCancelled(restfulBase.builder.getMsgTag());
        }

        @Override
        protected void onCancelled(InnerMode innerMode) {
            SimpleNotifyPool.getSimpleNotifyPool().onCancelled(restfulBase.builder.getMsgTag());
        }
    }


    private class DoTask2 extends AsyncTask<Void, Integer, InnerMode> {


        private RequestCallBack requestCallBack;
        public DoTask2(RequestCallBack requestCallBack) {
            this.requestCallBack = requestCallBack;
        }

        @Override
        protected InnerMode doInBackground(Void... voids) {
            return handle();
        }

        @Override
        protected void onPostExecute(InnerMode innerMode) {
            // super.onPostExecute(string);
            if (innerMode!=null) {
                if (innerMode.flag == Result.OK) {
                    if (innerMode.data == null && innerMode.heads == null) {
                        if (requestCallBack!=null)
                            requestCallBack.error(builder.getMsgTag());
                        SimpleNotifyPool.getSimpleNotifyPool().error(builder.getMsgTag());
                    } else {
                        if (requestCallBack!=null)
                            requestCallBack.onResult(builder.getMsgTag(), innerMode.data, innerMode.heads);
                        SimpleNotifyPool.getSimpleNotifyPool().onResult(builder.getMsgTag(), innerMode.data, innerMode.heads);
                    }
                } else if (innerMode.flag == Result.PARSER_ERROR) {
                    if (requestCallBack!=null)
                        requestCallBack.parserError(builder.getMsgTag());
                    SimpleNotifyPool.getSimpleNotifyPool().parserError(builder.getMsgTag());
                } else if (innerMode.flag == Result.HTTP_ERROR) {
                    if (requestCallBack!=null)
                        requestCallBack.httpError(builder.getMsgTag());
                    SimpleNotifyPool.getSimpleNotifyPool().httpError(builder.getMsgTag());
                } else {
                    if (requestCallBack!=null)
                        requestCallBack.error(builder.getMsgTag());
                    SimpleNotifyPool.getSimpleNotifyPool().error(builder.getMsgTag());
                }
            } else {
                if (requestCallBack!=null)
                    requestCallBack.error(builder.getMsgTag());
                SimpleNotifyPool.getSimpleNotifyPool().error(builder.getMsgTag());
            }
        }





        @Override
        protected void onProgressUpdate(Integer... values) {
            if (values!=null && values.length>0) {
                if (requestCallBack!=null)
                    requestCallBack.onProgress(builder.getMsgTag(), values[0]);
                SimpleNotifyPool.getSimpleNotifyPool().onProgress(builder.getMsgTag(), values[0]);
            }
        }

        @Override
        protected void onCancelled() {
            if (requestCallBack!=null)
                requestCallBack.onCancelled(builder.getMsgTag());
            SimpleNotifyPool.getSimpleNotifyPool().onCancelled(builder.getMsgTag());
        }

        @Override
        protected void onCancelled(InnerMode innerMode) {
            if (requestCallBack!=null)
                requestCallBack.onCancelled(builder.getMsgTag());
            SimpleNotifyPool.getSimpleNotifyPool().onCancelled(builder.getMsgTag());
        }
    }


}
