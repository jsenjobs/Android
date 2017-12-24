package org.chaosstudio.lib.ui.ptr;

import android.view.View;

import in.srain.cube.views.ptr.PtrDefaultHandler;
import in.srain.cube.views.ptr.PtrDefaultHandler2;
import in.srain.cube.views.ptr.PtrFrameLayout;
import in.srain.cube.views.ptr.PtrHandler2;

/**
 * Created by jsen on 2017/7/15.
 */

public abstract class HVPtrHandler2<PF extends HVPtrFrameLayout> implements PtrHandler2 {
    protected PF pf;

    public HVPtrHandler2(PF pf) {
        this.pf = pf;
    }

    @Override
    public boolean checkCanDoLoadMore(PtrFrameLayout frame, View content, View footer) {
        return PtrDefaultHandler2.checkContentCanBePulledUp(frame, content, footer) && !pf.mIsVpDragger;
    }

    @Override
    public boolean checkCanDoRefresh(PtrFrameLayout frame, View content, View header) {
        return PtrDefaultHandler.checkContentCanBePulledDown(frame, content, header) && !pf.mIsVpDragger;
    }

    static class PH extends HVPtrHandler2<HVPtrFrameLayout> {

        public PH(HVPtrFrameLayout hvPtrFrameLayout) {
            super(hvPtrFrameLayout);
        }

        @Override
        public void onLoadMoreBegin(PtrFrameLayout frame) {

        }

        @Override
        public void onRefreshBegin(PtrFrameLayout frame) {

        }
    }

}
