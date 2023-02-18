import { useCallback } from "react";
import { useDispatch } from "react-redux";
// * hooks
import { useGetListsQuery } from "../hooks/postQueries";
import { setId } from "../store";

const List = () => {
  const dispatch = useDispatch();
  const onPostClick = useCallback(
    (newId: number) => () => {
      dispatch(setId(newId));
    },
    [dispatch]
  );

  const { data: list, status: listStatus } = useGetListsQuery(undefined);

  return (
    <div className="flex-0 px-4 w-1/4">
      {listStatus === "fulfilled" && list
        ? list.map((item) => (
            <div
              onClick={onPostClick(item.id)}
              className="mt-2 px-2 py-2 border border-orange-500 rounded-md hover:border-orange-300 hover:bg-orange-300 hover:text-white cursor-pointer flex justify-between"
              key={`item-list-${item.id}`}
            >
              <span>{item.title}</span>
              <span>{item.author}</span>
            </div>
          ))
        : null}
    </div>
  );
};

export default List;
