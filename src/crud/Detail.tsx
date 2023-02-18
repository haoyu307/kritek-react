import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// * hooks
import {
  useAddPostMutation,
  useGetDetailQuery,
  useUpdatePostMutation,
} from "../hooks/postQueries";
import { idSelector, setId } from "../store";

const Detail = () => {
  const id = useSelector(idSelector);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const authorRef = useRef<HTMLInputElement | null>(null);
  const detailRef = useRef<HTMLTextAreaElement | null>(null);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  }, [id]);

  const [addPost, { isLoading: isAdding }] = useAddPostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  // * fetch
  const { data: detail, status: detailStatus } = useGetDetailQuery(id ?? 0);
  useEffect(() => {
    if (detailStatus === "fulfilled" && detail) {
      if (titleRef.current) {
        titleRef.current.value = detail.title;
      }
      if (authorRef.current) {
        authorRef.current.value = detail.author;
      }
      if (detailRef.current) {
        detailRef.current.value = detail.detail;
      }
    }
  }, [detail, detailStatus]);

  // * event handler
  const onAddClick = useCallback(() => {
    dispatch(setId(undefined));
  }, [dispatch]);
  const onEditClick = useCallback(() => {
    setEditMode((old) => !old);
  }, []);
  const onAddUpdate = useCallback(() => {
    if (!isAdding && !isUpdating) {
      if (id) {
        updatePost({
          id,
          title: titleRef.current?.value ?? "",
          author: authorRef.current?.value ?? "",
          detail: detailRef.current?.value ?? "",
        }).then((_) => {
          setEditMode(false);
        });
      } else {
        addPost({
          title: titleRef.current?.value ?? "",
          author: authorRef.current?.value ?? "",
          detail: detailRef.current?.value ?? "",
        }).then((result: any) => {
          if (result?.data?.id) dispatch(setId(result.data.id));
        });
      }
    }
  }, [id, addPost, updatePost, isAdding, isUpdating, dispatch]);

  return (
    <>
      <div className={`flex-0 ml-12 w-2/4 ${editMode ? "hidden" : ""}`}>
        {detailStatus === "fulfilled" && detail ? (
          <>
            <div className="text-3xl">{detail.title}</div>
            <div className="flex ml-4 text-xl">{detail.author}</div>
            <div className="mt-4 text-sm">{detail.detail}</div>
            <div className="mt-12 flex justify-center">
              <button
                onClick={onAddClick}
                className="px-12 py-2 rounded-md bg-orange-300 border border-orange-300 text-white hover:bg-white hover:text-black cursor-pointer"
              >
                Add
              </button>
              <button
                onClick={onEditClick}
                className="ml-4 px-12 py-2 rounded-md bg-orange-300 border border-orange-300 text-white hover:bg-white hover:text-black cursor-pointer"
              >
                Edit
              </button>
            </div>
          </>
        ) : null}
      </div>
      <div
        className={`px-4 py-8 w-1/4 border border-black flex flex-col items-center ${
          editMode ? "" : "hidden"
        }`}
      >
        <input
          ref={titleRef}
          placeholder="Input a title"
          className="w-full text-3xl border border-orange-500 rounded-md"
        />
        <input
          ref={authorRef}
          placeholder="Input an author name"
          className="mt-2 w-full text-xl border border-orange-500 rounded-md"
        />
        <textarea
          ref={detailRef}
          placeholder="Input a detail"
          className="mt-4 w-full px-2 py-1 h-20 rounded-md border border-orange-500 text-sm"
        />
        <button
          onClick={onAddUpdate}
          className="mt-12 px-12 py-2 rounded-md bg-orange-300 border border-orange-300 text-white hover:bg-white hover:text-black cursor-pointer"
        >
          {id ? "Update" : "Create"}
        </button>
      </div>
    </>
  );
};

export default Detail;
