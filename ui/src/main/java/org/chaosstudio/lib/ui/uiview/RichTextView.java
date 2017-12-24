package org.chaosstudio.lib.ui.uiview;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.support.annotation.IdRes;
import android.support.annotation.Nullable;
import android.text.Html;
import android.text.Layout;
import android.text.Selection;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.TextUtils;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

import org.chaosstudio.lib.ui.R;

/**
 * Created by jsen on 2017/7/19.
 */

public class RichTextView extends android.support.v7.widget.AppCompatTextView {

    int richColor = Color.BLUE;

    OnClickListener onClickListener;

    public RichTextView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public RichTextView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attributeSet) {
        setMovementMethod(new MyLinkMovementMethod());
        TypedArray a = context.obtainStyledAttributes(attributeSet, R.styleable.RichTextView);
        try {
            richColor = a.getColor(R.styleable.RichTextView_rich_color, richColor);

            String text = a.getString(R.styleable.RichTextView_rich_text);
            setRichText(text);
        } finally {
            a.recycle();
        }

    }

    @Override
    public void setOnClickListener(OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
    }

    public void setRichText(String text) {
        if (TextUtils.isEmpty(text)) return;

        int start = text.indexOf("$rich$");
        int end = text.lastIndexOf("$rich$");
        end -= 6;
        text = text.replace("$rich$", "");
        int len = text.length();
        if (start >= len || end > len || start < 0 || end < 0 || start == end) {
            setText(text);
            return;
        }
        SpannableString spannableString = new SpannableString(text);
        spannableString.setSpan(new Clickable(), start, end,
                Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        setText(spannableString);
    }

    public void setRichIcon(String text, @IdRes int icon) {
        if (TextUtils.isEmpty(text)) {
            setText(transferBiaoQing("", icon, ""));
        } else {
            int iid = text.indexOf("$icon$");
            if (iid < 0) {
                setText(transferBiaoQing(text, icon, ""));
            } else {
                setText(transferBiaoQing(text.substring(0, iid),
                        icon, text.substring(iid + 6, text.length())));
            }
        }
    }

    /**
     * 内部类，用于截获点击富文本后的事件
     * @author pro
     *
     */
    class Clickable extends ClickableSpan implements OnClickListener {

        public Clickable() {

        }

        @Override
        public void onClick(View v) {
            if (onClickListener != null)
                onClickListener.onClick(v);
        }
        @Override
        public void updateDrawState(TextPaint ds) {
            ds.setColor(richColor);
            ds.setUnderlineText(false);    //去除超链接的下划线
        }
    }

    /**
     * 将富文本转成CharSequence
     * @param bf 普通内容
     * @param ed 普通内容
     * @param bqId  表情图片
     * @return
     */
    public CharSequence transferBiaoQing(String bf,int bqId, String ed) {
        return Html.fromHtml(bf + "<img src=\"" + bqId + "\">" + ed, imageGetter, null);
    }
    /**
     * 获取本地图片资源
     */
    private Html.ImageGetter imageGetter = new Html.ImageGetter() {
        @Override
        public Drawable getDrawable(String source) {
            int id = Integer.parseInt(source);
            // 根据id从资源文件中获取图片对象
            Drawable d = getContext().getResources().getDrawable(id);
            // 以此作为标志位，方便外部取出对应的资源id
            d.setState(new int[] { id });
            d.setBounds(0, 0, d.getIntrinsicWidth(), d.getIntrinsicHeight());
            return d;
        }
    };

    class MyLinkMovementMethod extends LinkMovementMethod {

        @Override
        public boolean onTouchEvent(TextView widget, Spannable buffer, MotionEvent event) {

            int action = event.getAction();

            if (action == MotionEvent.ACTION_UP ||
                    action == MotionEvent.ACTION_DOWN) {
                int x = (int) event.getX();
                int y = (int) event.getY();

                x -= widget.getTotalPaddingLeft();
                y -= widget.getTotalPaddingTop();

                x += widget.getScrollX();
                y += widget.getScrollY();

                Layout layout = widget.getLayout();

                int line = layout.getLineForVertical(y);
                int off = layout.getOffsetForHorizontal(line, x);

                Log.i("test", "line"+line);
                Log.i("test", "off"+off);
                ClickableSpan[] link = buffer.getSpans(off, off, ClickableSpan.class);

                if (link.length != 0&&action == MotionEvent.ACTION_UP) {

                    link[0].onClick(widget);

                }

                return true;
            } else {
                Selection.removeSelection(buffer);
            }
            return true;
        }
    }
}
