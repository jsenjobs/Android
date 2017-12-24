package org.chaosstudio.lib.ui.navigation;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.support.annotation.ColorInt;
import android.util.AttributeSet;

import org.chaosstudio.lib.ui.R;
import org.chaosstudio.lib.ui.uiview.TextViewPlus;

/**
 * Created by jsen on 2017/6/27.
 *
 */

public class BottomNavigationItem extends TextViewPlus {
    public int getNormalColor(@ColorInt int defaultNormalColor) {
        return normalColor == -1 ? defaultNormalColor : normalColor;
    }
    public int getTargetColor(@ColorInt int defaultTargetColor) {
        return targetColor == -1 ? defaultTargetColor : targetColor;
    }

    private int normalColor, targetColor;
    private Drawable targetDrawable;
    private Drawable[] nds;
    public BottomNavigationItem(Context context) {
        super(context);
    }

    public BottomNavigationItem(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public BottomNavigationItem(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attributeSet) {
        TypedArray a = context.obtainStyledAttributes(attributeSet, R.styleable.SimpleBottomBar);
        try {
            normalColor = a.getColor(R.styleable.SimpleBottomBar_normalcolor, -1);
            targetColor = a.getColor(R.styleable.SimpleBottomBar_targetcolor, -1);
            if (a.hasValue(R.styleable.SimpleBottomBar_targetDrawable)) {
                targetDrawable = a.getDrawable(R.styleable.SimpleBottomBar_targetDrawable);
            }
        } finally {
            a.recycle();
        }
    }

    public void setUnSelected(@ColorInt int defaultNormalColor) {
        setTextColor(getNormalColor(defaultNormalColor));
        if (targetDrawable != null) {
            resetDrawable();
        }
        clearDrawableColor();
    }
    public void setMidSelected(@ColorInt int defaultNormalColor, @ColorInt int defaultTargetColor) {
        int nColor = getNormalColor(defaultNormalColor);
        int tColor = getTargetColor(defaultTargetColor);
        int mColor = getMidColor(nColor, tColor);
        setTextColor(mColor);
        if (targetDrawable!=null) {
            resetDrawable();
        }
        setDrawableColor(mColor);
    }
    public void setSelected(@ColorInt int defaultTargetColor) {
        int color = getTargetColor(defaultTargetColor);
        setTextColor(color);
        if (targetDrawable!=null) {
            setTargetDrawable(targetDrawable);
        } else {
            setDrawableColor(color);
        }
    }



    private void setDrawableColor(int color) {
        Drawable drawables[] = getCompoundDrawables();
        for (Drawable drawable:drawables) {
            if (drawable!=null) drawable.setColorFilter(color, PorterDuff.Mode.SRC_IN);
        }
    }
    private void setTargetDrawable(Drawable drawable) {
        nds = getCompoundDrawables();
        Drawable[] nds2 = {null, null, null, null};
        for (int i = 0; i<4; i++) {
            if (nds[i] != null) {
                nds2[i] = targetDrawable;
                break;
            }
        }
        setDrawables(nds2);
    }
    private void resetDrawable() {
        if (nds!=null)
            setDrawables(nds);
    }

    private void clearDrawableColor() {
        Drawable drawables[] = getCompoundDrawables();
        for (Drawable drawable:drawables) {
            if (drawable!=null) drawable.clearColorFilter();
        }
    }

    private int getMidColor(int color1, int color2) {
        int r1, g1, b1, r2, g2, b2;
        r1 = color1>>16 & 0xFF;
        g1 = color1>>8 & 0xFF;
        b1 = color1 & 0xFF;
        r2 = color2>>16 & 0xFF;
        g2 = color2>>8 & 0xFF;
        b2 = color2 & 0xFF;
        int r = (r1+r2)/2;
        int g = (g1+g2)/2;
        int b = (b1+b2)/2;
        return Color.rgb(r, g, b);
    }

    private boolean isCurrentActionTarget = false;
    private int index = 0;
    public int getIndex() {
        return index;
    }
    public void setIndex(int index) {
        this.index = index;
    }
    public boolean isCurrentActionTarget() {
        return isCurrentActionTarget;
    }
    public void setCurrentActionTarget(boolean currentActionTarget) {
        isCurrentActionTarget = currentActionTarget;
    }
}