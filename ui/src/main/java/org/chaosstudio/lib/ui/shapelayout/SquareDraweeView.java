package org.chaosstudio.lib.ui.shapelayout;

import android.content.Context;
import android.util.AttributeSet;

import com.facebook.drawee.generic.GenericDraweeHierarchy;
import com.facebook.drawee.view.SimpleDraweeView;

/**
 * Created by jsen on 2017/7/16.
 */

public class SquareDraweeView extends SimpleDraweeView {
    public SquareDraweeView(Context context, GenericDraweeHierarchy hierarchy) {
        super(context, hierarchy);
    }

    public SquareDraweeView(Context context) {
        super(context);
    }

    public SquareDraweeView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public SquareDraweeView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public SquareDraweeView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        setMeasuredDimension(getDefaultSize(0, widthMeasureSpec), getDefaultSize(0, heightMeasureSpec));

        int childWidthSize = getMeasuredWidth();
        int childHeightSize = getMeasuredHeight();
        childWidthSize = childWidthSize>childHeightSize?childWidthSize:childHeightSize;

        heightMeasureSpec = widthMeasureSpec = MeasureSpec.makeMeasureSpec(childWidthSize, MeasureSpec.EXACTLY);
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }
}
