package org.chaosstudio.lib.ui.recyclerview;

import android.support.annotation.NonNull;
import android.util.SparseArray;

import org.chaosstudio.lib.ui.recyclerview.component.CoreRecyclerViewBind;
import org.chaosstudio.lib.ui.recyclerview.component.CoreRecyclerViewHolder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by jsen on 2017/7/14.
 */

public class RecyclerVHVBManager {
    private static final Map<Integer, VBVH<CoreRecyclerViewHolder>> VBVHS = new HashMap<>();
    public static void registerVHVB(VBVH<CoreRecyclerViewHolder> vbvh) {
        if(!VBVHS.containsKey(vbvh.getLayoutID())) {
            VBVHS.put(vbvh.getLayoutID(), vbvh);
        }
    }
    public static void registerVHVBs(List<VBVH<CoreRecyclerViewHolder>> vbvhs) {
        for (VBVH<CoreRecyclerViewHolder> v : vbvhs) {
            registerVHVB(v);
        }
    }

    public static VBVH<CoreRecyclerViewHolder> remove(int layoutID) {
        return VBVHS.remove(layoutID);
    }

    public static VBVH<CoreRecyclerViewHolder> get(int layoutID) {
        return VBVHS.get(layoutID);
    }

    static SparseArray<VBVH<CoreRecyclerViewHolder>> parserListToSA(List<VBVH<CoreRecyclerViewHolder>> vbvhs) {
        SparseArray<VBVH<CoreRecyclerViewHolder>> vbvhMap = new SparseArray<>();
        for(VBVH<CoreRecyclerViewHolder> v:vbvhs) {
            vbvhMap.put(v.getLayoutID(), v);
        }
        return vbvhMap;
    }

    public static class VBVH<VH extends CoreRecyclerViewHolder> {
        int layoutID;
        Class<VH> vhc;
        CoreRecyclerViewBind vb;

        public VBVH(int layoutID, @NonNull Class<VH> vhc, @NonNull CoreRecyclerViewBind vb) {
            this.vhc = vhc;
            this.vb = vb;
            this.layoutID = layoutID;
        }

        public Class<VH> getVhc() {
            return vhc;
        }

        public CoreRecyclerViewBind getVb() {
            return vb;
        }

        int getLayoutID() {
            return layoutID;
        }
    }
}
