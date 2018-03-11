package com.example.jsen.deliverwater.weex.util;

import android.content.Context;
import android.content.res.AssetManager;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.core.ImagePipeline;
import com.facebook.imagepipeline.request.ImageRequest;
import com.taobao.weex.utils.WXLogUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

/**
 * Created by jsen on 2017/12/27.
 */

public class WXCacheLocalAssetsUtils {

    private static HashMap<String, String> caches = new HashMap<>();

    public static void InitCache(Context context) {
        AssetManager am = context.getAssets();
        loopFind(context, am, "dist");

    }
    private static void loopFind(Context context, AssetManager am, String dir) {
        try {
            String files[] = am.list(dir);
            if(files != null) {
                for(String fileName: files) {
                    String path = dir + "/" + fileName;
                    if (fileName.endsWith(".js")) {
                        // Log.e("Cache Init", path);
                        caches.put(path, loadAsset(path, context));
                    } else if (fileName.endsWith(".png") || fileName.endsWith(".jpg")) {
                        // Log.e("Cache Init", path);
                        addImageToCache("asset:///" + path, context);
                    } else if (!fileName.contains(".")) {
                        loopFind(context, am, path);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private static void addImageToCache(String path, Context context) {
        ImagePipeline imagePipeline = Fresco.getImagePipeline();
        ImageRequest imageRequest = ImageRequest.fromUri(path);
        imagePipeline.prefetchToBitmapCache(imageRequest, context);
    }

    /**
     * Load file in device directory, if not exist, load from asset directory.
     * @param path FilePath
     * @param context Weex Context
     * @return the Content of the file
     */
    public static String loadFileOrAsset(String path, Context context) {
        String cache = caches.get(path);
        if (cache != null) {
            return cache;
        }
        if (!TextUtils.isEmpty(path)) {
            File file = new File(path);
            if (file.exists()) {
                try {
                    FileInputStream fis = new FileInputStream(file);
                    return readStreamToString(fis);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
            } else {
                return loadAsset(path, context);
            }
        }
        return "";
    }

    /**
     * Load file in asset directory.
     * @param path FilePath
     * @param context Weex Context
     * @return the Content of the file
     */
    public static String loadAsset(String path, Context context) {
        String cache = caches.get(path);
        if (cache != null) {
            return cache;
        }
        if (context == null || TextUtils.isEmpty(path)) {
            return null;
        }
        InputStream inputStream;
        try {
            inputStream = context.getAssets().open(path);
            return readStreamToString(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    private static String readStreamToString(InputStream inputStream) {
        BufferedReader bufferedReader = null;
        try {
            StringBuilder builder = new StringBuilder(inputStream.available() + 10);
            bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            char[] data = new char[4096];
            int len = -1;
            while ((len = bufferedReader.read(data)) > 0) {
                builder.append(data, 0, len);
            }

            return builder.toString();
        } catch (IOException e) {
            e.printStackTrace();
            WXLogUtils.e("", e);
        } finally {
            try {
                if (bufferedReader != null)
                    bufferedReader.close();
            } catch (IOException e) {
                WXLogUtils.e("WXFileUtils loadAsset: ", e);
            }
            try {
                if (inputStream != null)
                    inputStream.close();
            } catch (IOException e) {
                WXLogUtils.e("WXFileUtils loadAsset: ", e);
            }
        }

        return "";
    }

    public static boolean saveFile(String path, byte[] content, Context context) {
        if (TextUtils.isEmpty(path) || content == null || context == null) {
            return false;
        }
        FileOutputStream outStream = null;
        try {
            outStream = new FileOutputStream(path);
            outStream.write(content);
            return true;
        } catch (Exception e) {
            WXLogUtils.e("WXFileUtils saveFile: " + WXLogUtils.getStackTrace(e));
        } finally {
            if (outStream != null) {
                try {
                    outStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return false;
    }

    public static String md5(String  template){
        try {
            if(template == null){
                return  "";
            }
            return  md5(template.getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            return  "";
        }
    }

    public static String md5(byte[] bts){
        try {
            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.update(bts);
            BigInteger bigInt = new BigInteger(1, digest.digest());
            return  bigInt.toString(16);
        } catch (NoSuchAlgorithmException e) {;
            return  "";
        }
    }
}
