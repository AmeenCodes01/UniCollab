"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import Link from "next/link";
import {api} from "../../../../convex/_generated/api";
import {revalidatePath} from "next/cache";
import {FormEvent, useEffect} from "react";
import {useForm} from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {useMutation, useQuery} from "convex/react";
import {useRouter, useSearchParams} from "next/navigation";
import {Id} from "../../../../convex/_generated/dataModel";

const formSchema = z.object({
  title: z.string().min(1, "Cannot be left blank"),
  shortDesc: z.string().min(1, "Cannot be left blank"),
  description: z.string().min(1, "Cannot be left blank"),
  lookingFor: z.string().min(1, "Cannot be left blank"),
  meetingFormat: z.string().min(1, "Cannot be left blank"),
  limit: z.string(),
});

function ShareIdea() {
  const createIdea = useMutation(api.ideas.create);
  const saveIdea = useMutation(api.ideas.editIdea);
  const router = useRouter();

  //for edit
  const param = useSearchParams();
  const editId = param.get("id")?.toString();
  const editIdea =  useQuery(api.ideas.getIdea,editId? {
        ideaId: editId as Id<"ideas">,
      }:"skip")
    
  console.log(editId ? true : false, "edit");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      shortDesc: "",
      description: "",
      lookingFor: "",
      meetingFormat: "",
      limit: "1",
    },
  });
  const {
    formState: {errors, isSubmitting},
    reset,
  } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newVal = editId
      ? {
          ...values,
          limit: parseInt(values.limit),
          id: editId as Id<"ideas">,
        }
      : {...values, limit: parseInt(values.limit)};
    editId
      ? saveIdea(newVal as typeof newVal & {id: Id<"ideas">})
      : createIdea(newVal);
    router.push("/homefeed");
  }

  useEffect(() => {
    if (editId && editIdea) {
      reset({
        title: editIdea.title || "",
        shortDesc: editIdea.shortDesc || "",
        description: editIdea.description || "",
        lookingFor: editIdea.lookingFor || "",
        meetingFormat: editIdea.meetingFormat || "",
        limit: editIdea.limit?.toString() || "",
      });
    }
  }, [editId, editIdea, reset]);
  return (
    <Form {...form}>
      {/* <div className="justify-center items-center flex  flex-col w-full  h-full  "> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder=" Idea title i.e Virtual Card Maker "
                  className="w-full"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDesc"
          render={({field}) => (
            <FormItem>
              <FormLabel>short description</FormLabel>
              <FormControl>
                <Input placeholder="short description 1-2 lines" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lookingFor"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-xs font-light">
                Would love collaborating with:
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="artist / web dev / 3d / psychology etc"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="meetingFormat"
          render={({field}) => (
            <FormItem>
              <FormLabel>Meeting Format</FormLabel>
              <FormControl>
                <Input
                  placeholder="weekly 3 hrs / bi-weekly 2hrs /  "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="limit"
          render={({field}) => (
            <FormItem>
              <FormLabel>limit</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={6} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel> description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share more about your idea, from which school you'd like teammates to be or the skills you need help with etc.
             It is completely fine to say `I'll disclose more about my idea upon meeting.`
            "
                  {...field}
                  className=" px-2 min-h-32  border-[1.5px] "
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full " type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? editId
              ? "Saving Idea..."
              : "Sharing idea..."
            : editId
              ? "Save Idea"
              : " Share Idea"}
        </Button>
        {/* </Link> */}
      </form>
      {/* </div> */}
    </Form>
  );
}

export default ShareIdea;
//Button goes into a client side right.
