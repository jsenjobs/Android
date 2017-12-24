package org.chaosstudio.lib.net.fresco;

import android.content.Context;
import android.net.Uri;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.controller.BaseControllerListener;
import com.facebook.drawee.interfaces.DraweeController;
import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.imagepipeline.common.ImageDecodeOptions;
import com.facebook.imagepipeline.common.ResizeOptions;
import com.facebook.imagepipeline.common.RotationOptions;
import com.facebook.imagepipeline.core.ImagePipelineConfig;
import com.facebook.imagepipeline.image.ImageInfo;
import com.facebook.imagepipeline.request.ImageRequest;
import com.facebook.imagepipeline.request.ImageRequestBuilder;

import org.chaosstudio.lib.net.BaseUtils;

/**
 * Created by jsen on 2017/7/15.
 *
 */

public class FrescoUtils {
    private static boolean isInit = false;

    /**
     * 显示缩略图
     *
     * @param draweeView     draweeView
     * @param url            url
     * @param resizeWidthDp  resizeWidth
     * @param resizeHeightDp resizeHeight
     */
    public static void showThumb(SimpleDraweeView draweeView, String url, int resizeWidthDp, int resizeHeightDp) {
        if (url == null || "".equals(url))
            return;
        if (draweeView == null)
            return;
        initialize(draweeView.getContext());
        ImageRequest request = ImageRequestBuilder.newBuilderWithSource(Uri.parse(url))
                .setRotationOptions(RotationOptions.autoRotate())
                .setResizeOptions(new ResizeOptions(BaseUtils.dip2px(draweeView.getContext(), resizeWidthDp), BaseUtils.dip2px(draweeView.getContext(), resizeHeightDp)))
                .build();
        DraweeController controller = Fresco.newDraweeControllerBuilder()
                .setImageRequest(request)
                .setTapToRetryEnabled(true)
                .setOldController(draweeView.getController())
                .setControllerListener(new BaseControllerListener<ImageInfo>())
                .build();
        draweeView.setController(controller);
    }

    /**
     * 显示缩略图
     *
     * @param draweeView     draweeView
     * @param url            url
     * @param resizeWidthPx  resizeWidth
     * @param resizeHeightPx resizeHeight
     */
    public static void showThumbPx(SimpleDraweeView draweeView, String url, int resizeWidthPx, int resizeHeightPx) {
        if (url == null || "".equals(url))
            return;
        if (draweeView == null)
            return;
        initialize(draweeView.getContext());
        ImageRequest request = ImageRequestBuilder.newBuilderWithSource(Uri.parse(url))
                .setRotationOptions(RotationOptions.autoRotate())
                .setResizeOptions(new ResizeOptions(resizeWidthPx, resizeHeightPx))
                .build();
        DraweeController controller = Fresco.newDraweeControllerBuilder()
                .setImageRequest(request)
                .setTapToRetryEnabled(true)
                .setOldController(draweeView.getController())
                .setControllerListener(new BaseControllerListener<ImageInfo>())
                .build();
        draweeView.setController(controller);
    }

    public static void show(SimpleDraweeView draweeView, String url) {
        if (url == null || "".equals(url))
            return;
        if (draweeView == null)
            return;
        initialize(draweeView.getContext());
        ImageDecodeOptions decodeOptions = ImageDecodeOptions.newBuilder()
                // .setBackgroundColor(Color.GREEN)
                .build();

        ImageRequest request = ImageRequestBuilder
                .newBuilderWithSource(Uri.parse(url))
                .setRotationOptions(RotationOptions.autoRotate())
                .setImageDecodeOptions(decodeOptions)
                .setRotationOptions(RotationOptions.autoRotate())
                .setLocalThumbnailPreviewsEnabled(true)
                .setLowestPermittedRequestLevel(ImageRequest.RequestLevel.FULL_FETCH)
                .setProgressiveRenderingEnabled(false)
                .build();

        DraweeController controller = Fresco.newDraweeControllerBuilder()
                .setImageRequest(request)
                .setTapToRetryEnabled(true)
                .setOldController(draweeView.getController())
                .setControllerListener(new BaseControllerListener<ImageInfo>())
                .setAutoPlayAnimations(true)
                .build();
        draweeView.setController(controller);
    }

    public static String getRes(Context context, int res) {
        return "res://" +
                context.getPackageName() +
                "/" + res;
    }

    public static String getAssets(String nameWithSuffix) {
        return "asset:///" +
                nameWithSuffix;
    }

    /**
     * initialize
     *
     * @param context context
     */
    public static void initialize(Context context) {
        if (isInit)
            return;
        ImagePipelineConfig config = ImagePipelineConfig.newBuilder(context)
                .setDownsampleEnabled(true)
                .build();
        Fresco.initialize(context, config);
        isInit = true;
    }
}
