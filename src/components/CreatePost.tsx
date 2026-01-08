import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createPostSchema, type CreatePostFormData } from "../schemas/postSchema";
import { addPost } from "../slices/postSlice";
import type { Post } from "../slices/postSlice";
import ErrorMessage from "./ui/ErrorMessage";
import { Button } from "../ui/button";

const AUTHORS = [
  { id: 1, name: "Author 1" },
  { id: 2, name: "Author 2" },
  { id: 3, name: "Author 3" }
] as const;

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      body: "",
      author: "",
    },
  });

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      const newPost: Post = {
        id: Date.now(),
        userId: parseInt(data.author, 10),
        title: data.title.trim(),
        body: data.body.trim(),
      };

      dispatch(addPost(newPost));
      toast.success("A new post has been successfully created!");

      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "An error occurred while creating post"
      );
    }
  };

  return (
    <section className="mt-6 rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm" aria-labelledby="create-post-heading">
      <div className="py-4.5 px-4 flex items-center gap-2.5 bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15.6333 2.33333H6.99992C6.38108 2.33333 5.78759 2.57917 5.35 3.01675C4.91242 3.45434 4.66659 4.04783 4.66659 4.66667V23.3333C4.66659 23.9522 4.91242 24.5457 5.35 24.9833C5.78759 25.4208 6.38108 25.6667 6.99992 25.6667H20.9999C21.6188 25.6667 22.2122 25.4208 22.6498 24.9833C23.0874 24.5457 23.3333 23.9522 23.3333 23.3333V14.7M2.33325 7H6.99992M2.33325 11.6667H6.99992M2.33325 16.3333H6.99992M2.33325 21H6.99992M24.9409 6.56367C25.4057 6.09892 25.6668 5.46859 25.6668 4.81133C25.6668 4.15408 25.4057 3.52375 24.9409 3.059C24.4762 2.59425 23.8458 2.33316 23.1886 2.33316C22.5313 2.33316 21.901 2.59425 21.4363 3.059L15.5913 8.90633C15.3139 9.18356 15.1108 9.52622 15.0009 9.90267L14.0244 13.251C13.9951 13.3514 13.9934 13.4578 14.0193 13.5591C14.0453 13.6604 14.098 13.7529 14.1719 13.8268C14.2459 13.9008 14.3383 13.9535 14.4396 13.9794C14.5409 14.0054 14.6474 14.0036 14.7478 13.9743L18.0961 12.9978C18.4725 12.8879 18.8152 12.6849 19.0924 12.4075L24.9409 6.56367Z"
            stroke="black"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 id="create-post-heading" className="text-xl font-semibold text-black">Create a New Post</h1>
      </div>

      <div className="max-w-212 m-6 bg-white rounded-xl min-h-[789px]">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6" noValidate aria-label="Create new post form">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2.5 block text-base font-semibold text-black"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title")}
                className="w-full bg-[#000000]/10 rounded-xl p-4 text-base placeholder:text-black/50 placeholder:text-base"
                placeholder="Enter post title"
                aria-required="true"
                aria-invalid={errors.title ? "true" : "false"}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              <ErrorMessage message={errors.title?.message} id="title-error" />
            </div>

            <div>
              <label
                htmlFor="body"
                className="mb-2.5 block text-base font-semibold text-black"
              >
                Body
              </label>
              <textarea
                id="body"
                {...register("body")}
                rows={8}
                className="w-full bg-[#000000]/10 rounded-xl p-4 text-base placeholder:text-black/50 placeholder:text-base resize-none"
                placeholder="Enter post body"
                aria-required="true"
                aria-invalid={errors.body ? "true" : "false"}
                aria-describedby={errors.body ? "body-error" : undefined}
              />
              <ErrorMessage message={errors.body?.message} id="body-error" />
            </div>

            <div>
              <label
                htmlFor="author"
                className="mb-2.5 block text-base font-semibold text-black"
              >
                Author
              </label>
              <select
                id="author"
                {...register("author")}
                className="w-full bg-[#000000]/10 rounded-xl p-4 text-base text-black"
                aria-required="true"
                aria-invalid={errors.author ? "true" : "false"}
                aria-describedby={errors.author ? "author-error" : undefined}
              >
                <option value="">Select Author</option>
                {AUTHORS.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
              <ErrorMessage message={errors.author?.message} id="author-error" />
            </div>
          </div>

          <div className="mt-12 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl w-fit text-base bg-[#333333] lg:min-w-[405px] p-4 text-white hover:bg-gray-700 transition-colors"
              aria-label={isSubmitting ? "Creating post, please wait" : "Create new post"}
            >
              {isSubmitting ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
