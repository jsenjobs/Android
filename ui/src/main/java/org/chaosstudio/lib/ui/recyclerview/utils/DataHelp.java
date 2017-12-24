package org.chaosstudio.lib.ui.recyclerview.utils;

import org.chaosstudio.lib.ui.recyclerview.RecyclerVHVBManager;
import org.chaosstudio.lib.ui.recyclerview.component.CoreRecyclerModel;
import org.chaosstudio.lib.ui.recyclerview.component.CoreRecyclerViewHolder;

import java.util.List;

/**
 * Created by jsen on 2017/7/15.
 */

public interface DataHelp<M extends CoreRecyclerModel> {
    void addData(M data);
    void addDatas(List<M> dataList);

    void clearDatas();
    void noData();

    void addVBVHS(List<RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder>> VBVHS);
    void addVBVH(RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder> VBVH);

    DataList<M> getDataList();


}
