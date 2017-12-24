package org.chaosstudio.lib.ui.camera.record.widget;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;

import org.chaosstudio.lib.ui.R;

/**
 * Created by jsen on 2017/8/22.
 */

public class BottomMask extends View {
    private final int maskColor;
    private Paint paint;


    public BottomMask(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        //初始化自定义属性信息
        TypedArray array = context.obtainStyledAttributes(attrs, R.styleable.ViewfinderView);
        maskColor = array.getColor(R.styleable.ViewfinderView_mask_color, 0x80000000);

        paint = new Paint();
        paint.setAntiAlias(true);
    }

    Rect frame;
    int width = -1;
    int height = -1;
    @Override
    protected void onDraw(Canvas canvas) {
        // super.onDraw(canvas);

        if (frame == null) {
            width = canvas.getWidth();
            height = canvas.getHeight();
            frame = new Rect(0, 0, width, width);
        }

        drawExterior(canvas, frame, width, height);
    }

    // 绘制模糊区域 Draw the exterior (i.e. outside the framing rect) darkened
    private void drawExterior(Canvas canvas, Rect frame, int width, int height) {
        paint.setColor(maskColor);
        canvas.drawRect(0, 0, width, frame.top, paint);
        canvas.drawRect(0, frame.top, frame.left, frame.bottom + 1, paint);
        canvas.drawRect(frame.right + 1, frame.top, width, frame.bottom + 1, paint);
        canvas.drawRect(0, frame.bottom + 1, width, height, paint);
    }
}
