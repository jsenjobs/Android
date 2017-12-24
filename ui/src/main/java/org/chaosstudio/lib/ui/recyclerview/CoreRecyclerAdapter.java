package org.chaosstudio.lib.ui.recyclerview;

import android.content.Context;
import android.os.Build;
import android.support.v7.widget.RecyclerView;
import android.util.SparseArray;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import org.chaosstudio.lib.ui.recyclerview.component.CoreRecyclerModel;
import org.chaosstudio.lib.ui.recyclerview.component.CoreRecyclerViewBind;
import org.chaosstudio.lib.ui.recyclerview.component.CoreRecyclerViewHolder;
import org.chaosstudio.lib.ui.recyclerview.utils.DataHelp;
import org.chaosstudio.lib.ui.recyclerview.utils.DataList;
import org.chaosstudio.lib.ui.recyclerview.utils.RecyclerItemClickListener;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

/**
 * Created by jsen on 2017/7/14.
 *
 */

public class CoreRecyclerAdapter<M extends CoreRecyclerModel> extends RecyclerView.Adapter<CoreRecyclerViewHolder> implements DataHelp<M> {
    private Context context;
    private DataList<M> datas = new DataList<>();
    private SparseArray<RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder>> VBVHS = new SparseArray<>();
    // private Map<Integer, RecyclerVHVBManager.VBVH> VBVHS = new HashMap<>();

    public CoreRecyclerAdapter(Context context, List<M> datas, List<RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder>> VBVHS) {
        this.context = context;
        this.datas.addAll(datas);
        this.datas.setAdapter(this);
        this.VBVHS = RecyclerVHVBManager.parserListToSA(VBVHS);
    }

    public CoreRecyclerAdapter(Context context, List<M> datas) {
        this.context = context;
        this.datas.addAll(datas);
        this.datas.setAdapter(this);
    }

    public CoreRecyclerAdapter(Context context, DataList<M> datas, List<RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder>> VBVHS) {
        this.context = context;
        this.datas = datas;
        this.datas.setAdapter(this);
        this.VBVHS = RecyclerVHVBManager.parserListToSA(VBVHS);
    }

    public CoreRecyclerAdapter(Context context, DataList<M> datas) {
        this.context = context;
        this.datas = datas;
        this.datas.setAdapter(this);
    }

    public CoreRecyclerAdapter(Context context) {
        this.context = context;
        this.datas.setAdapter(this);
    }

    @Override
    public int getItemViewType(int position) {
        return datas.get(position).getLayoutID();
    }

    @Override
    public CoreRecyclerViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(context).inflate(viewType, parent, false);
        RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder> vbvh = getVBVH(viewType);


        if (vbvh != null) {
            Class<CoreRecyclerViewHolder> cvhs = vbvh.getVhc();
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                try {
                    Constructor cvhsc = cvhs.getDeclaredConstructor(View.class, RecyclerItemClickListener.class);
                    CoreRecyclerViewHolder vh = (CoreRecyclerViewHolder)cvhsc.newInstance(v, itemClickListener);
                    vh.setViewBind(vbvh.getVb());
                    return vh;
                } catch (InstantiationException | NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
                    e.printStackTrace();
                }
            } else {
                try {
                    Constructor cvhsc = cvhs.getDeclaredConstructor(View.class, RecyclerItemClickListener.class);
                    CoreRecyclerViewHolder vh = (CoreRecyclerViewHolder)cvhsc.newInstance(v, itemClickListener);
                    vh.setViewBind(vbvh.getVb());
                    return vh;
                } catch (InstantiationException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }

    @Override
    public void onBindViewHolder(CoreRecyclerViewHolder holder, int position) {
        CoreRecyclerViewBind vb = holder.getViewBind();
        vb.bind(holder, datas.get(position));
    }

    @Override
    public int getItemCount() {
        return datas.size();
    }

    private RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder> getVBVH(Integer layoutID) {
        RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder> vbvh = VBVHS.get(layoutID);
        if (vbvh == null) {
            RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder> vv = RecyclerVHVBManager.get(layoutID);
            if (vv != null) {
                VBVHS.put(layoutID, vv);
            }
            return vv;
        }
        return vbvh;
    }

    RecyclerItemClickListener itemClickListener;
    public void setItemClickListener(RecyclerItemClickListener itemClickListener) {
        this.itemClickListener = itemClickListener;
    }

    @Override
    public void addData(M data) {
        datas.add(data);
        datas.notifyDataSetChanged();
    }

    @Override
    public void addDatas(List<M> dataList) {
        datas.addAll(dataList);
        datas.notifyDataSetChanged();
    }

    @Override
    public void clearDatas() {
        datas.clear();
        datas.notifyDataSetChanged();
    }

    @Override
    public void noData() {
        datas.noData();
    }

    @Override
    public void addVBVHS(List<RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder>> VBVHS) {
        for(RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder> v : VBVHS) {
            this.VBVHS.put(v.getLayoutID(), v);
        }
    }

    @Override
    public void addVBVH(RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder> VBVH) {
        this.VBVHS.put(VBVH.getLayoutID(), VBVH);
    }

    @Override
    public DataList<M> getDataList() {
        return datas;
    }
}
