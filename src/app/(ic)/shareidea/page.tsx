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
import {FormEvent} from "react";
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
import {useMutation} from "convex/react";
import {useRouter} from "next/navigation";

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
  const router = useRouter();

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
  } = form;
  console.log(isSubmitting, "isSubmittin");
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newVal = {...values, limit: parseInt(values.limit)};
    createIdea(newVal);
    console.log(values, " V A L U E S FROM ZOD");
    router.push("/homefeed");
  }

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
          {isSubmitting ? "Sharing idea..." : " Share Idea"}{" "}
        </Button>
        {/* </Link> */}
      </form>
      {/* </div> */}
    </Form>
  );
}

export default ShareIdea;
//Button goes into a client side right.
