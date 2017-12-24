package org.chaosstudio.lib.ui.recyclerview.component;

import android.view.View;

import org.chaosstudio.lib.ui.recyclerview.utils.RecyclerItemClickListener;

/**
 * Created by jsen on 2017/7/15.
 */

public class CoreEventViewHolder extends CoreRecyclerViewHolder {
    public CoreEventViewHolder(View itemView, final RecyclerItemClickListener itemClickListener) {
        super(itemView, itemClickListener);
        if (itemClickListener!=null) {
            itemView.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View view) {
                    return itemClickListener.onItemLongClick(getLayoutID(), view, getAdapterPosition());
                }
            });
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    itemClickListener.onItemClick(getLayoutID(), view, getAdapterPosition());
                }
            });
        }
    }
}
