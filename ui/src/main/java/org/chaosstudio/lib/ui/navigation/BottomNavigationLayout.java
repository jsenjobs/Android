package org.chaosstudio.lib.ui.navigation;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Rect;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.widget.LinearLayout;

import org.chaosstudio.lib.ui.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jsen on 2017/6/27.
 *
 */

public class BottomNavigationLayout extends LinearLayout implements View.OnTouchListener {
    private enum STATE {
        ACTION,
        NONE
    }

    public BottomNavigationLayout(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public BottomNavigationLayout(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attributeSet) {
        setOrientation(HORIZONTAL);
        TypedArray a = context.obtainStyledAttributes(attributeSet, R.styleable.SimpleBottomBar);
        try {
            normalColor = a.getColor(R.styleable.SimpleBottomBar_normalcolor, 0xFFFFFF);
            targetColor = a.getColor(R.styleable.SimpleBottomBar_targetcolor, 0xFFFFFF);
        } finally {
            a.recycle();
        }
    }
    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        int c_size = getChildCount();
        children.clear();
        List<View> erase = new ArrayList<>();
        for (int i=0;i<c_size;i++) {
            View child = getChildAt(i);
            if (child instanceof BottomNavigationItem) {
                children.add((BottomNavigationItem)child);
            } else {
                erase.add(child);
            }
        }
        for (View v:erase) {
            removeView(v);
        }

        c_size = children.size();
        for (int i=0;i<c_size;i++) {
            BottomNavigationItem child = children.get(i);
            // child.setTag(i);
            child.setIndex(i);
            child.setUnSelected(normalColor);
            child.setOnTouchListener(this);
        }

        if (c_size>0) {
            if (selected < 0) {
                selected = 0;
            } else if (selected >= c_size) {
                selected = c_size - 1;
            }
            children.get(selected).setSelected(targetColor);
        }
    }


    private Handler handler = new Handler();
    private int clickedIndex = -1;
    private Runnable runnable = new Runnable() {
        @Override
        public void run() {
            clickedIndex = -1;
        }
    };
    private boolean Outed = false, isSame = false;
    private Rect rect = new Rect();
    @Override
    public boolean onTouch(View view, MotionEvent motionEvent) {
        if (! (view instanceof BottomNavigationItem)) return true;
        BottomNavigationItem item = (BottomNavigationItem) view;
        switch (motionEvent.getAction()) {
            case MotionEvent.ACTION_DOWN:
                if (state == STATE.ACTION) {
                    item.setCurrentActionTarget(false);
                    return true;
                } else {
                    item.setCurrentActionTarget(true);
                    state = STATE.ACTION;
                }
                isSame = selected == item.getIndex();
                if (!isSame) {
                    Outed = false;
                    rect.set(0, 0, view.getWidth(), view.getHeight());
                    item.setMidSelected(normalColor, targetColor);

                    if (selected<children.size() && -1<selected) {
                        children.get(selected).setMidSelected(normalColor, targetColor);
                    }
                }
                break;
            case MotionEvent.ACTION_MOVE:
                if (!item.isCurrentActionTarget()) return true;
                if (!isSame && !Outed && !rect.contains((int)motionEvent.getX(),
                        (int)motionEvent.getY())) {
                    // Log.e("x, y:", motionEvent.getX()+"  "+motionEvent.getY());
                    Outed = true;
                    item.setUnSelected(normalColor);
                    if (selected<children.size() && -1<selected) {
                        children.get(selected).setSelected(targetColor);
                    }

                } else if (Outed && rect.contains((int)motionEvent.getX(),
                        (int)motionEvent.getY())) {
                    Outed = false;
                }
                break;
            case MotionEvent.ACTION_UP:
                if (!item.isCurrentActionTarget()) return true;
                state = STATE.NONE;
                if (!isSame && !Outed) {
                    for (BottomNavigationItem child:children) {
                        child.setUnSelected(normalColor);
                    }
                    item.setSelected(targetColor);

                    selected = item.getIndex();
                    OnItemSelected(item, item.getIndex());

                }

                if (selected == clickedIndex) {
                    OnDoubleClick(item, item.getIndex());
                } else {
                    clickedIndex = selected;
                    handler.postDelayed(runnable, 500);
                }
                break;
            case MotionEvent.ACTION_CANCEL:
                if (!item.isCurrentActionTarget()) return true;
                state = STATE.NONE;
                if (!isSame && !Outed) {
                    for (BottomNavigationItem child:children) {
                        child.setUnSelected(normalColor);
                    }
                    item.setSelected(targetColor);

                    selected = item.getIndex();
                    OnItemSelected(item, (int) item.getIndex());
                }
                break;
        }
        return true;
    }

    public interface OnBottomNavigationItemClick {
        void OnItemSelected(BottomNavigationItem v, int index);
        void OnItemLongSelected(BottomNavigationItem v, int index);
        void OnItemMidSelected(BottomNavigationItem v, int index);
        void OnDoubleClick(BottomNavigationItem v, int index);
    }
    private void OnItemSelected(BottomNavigationItem v, int index) {
        if (onBottomNavigationItemClick!=null) {
            onBottomNavigationItemClick.OnItemSelected(v, index);
        }
    }
    private void OnItemLongSelected(BottomNavigationItem v, int index) {
        if (onBottomNavigationItemClick!=null) {
            onBottomNavigationItemClick.OnItemLongSelected(v, index);
        }
    }
    private void OnItemMidSelected(BottomNavigationItem v, int index) {
        if (onBottomNavigationItemClick!=null) {
            onBottomNavigationItemClick.OnItemMidSelected(v, index);
        }
    }
    private void OnDoubleClick(BottomNavigationItem v, int index) {
        if (onBottomNavigationItemClick!=null) {
            onBottomNavigationItemClick.OnDoubleClick(v, index);
        }
    }





    int selected;
    int normalColor, targetColor;
    STATE state = STATE.NONE;

    OnBottomNavigationItemClick onBottomNavigationItemClick;

    List<BottomNavigationItem> children = new ArrayList<>();



    /* Apis call start */
    public void setSelected(int i) {
        if (i<children.size() && -1<i) {
            this.selected = i;
            for (BottomNavigationItem item:children) {
                item.setUnSelected(normalColor);
            }
            children.get(i).setSelected(targetColor);

            OnItemSelected(children.get(i), i);
        }
    }

    public void setMidSelected(int i) {
        if (i<children.size() && -1<i) {
            for (BottomNavigationItem item:children) {
                item.setUnSelected(normalColor);
            }
            children.get(i).setMidSelected(normalColor, targetColor);
            OnItemMidSelected(children.get(i), i);
        }
    }

    public void setOnBottomNavigationItemClick(OnBottomNavigationItemClick onBottomNavigationItemClick) {
        this.onBottomNavigationItemClick = onBottomNavigationItemClick;
    }
    /* Apis call end */
}
