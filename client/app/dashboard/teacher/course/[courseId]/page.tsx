"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Video, CheckSquare, Trash2 } from "lucide-react";

export default function CourseDetailPage() {
  const params = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<any[]>([]);

  // Simulation for now until File Upload API is built
  const [demoFiles, setDemoFiles] = useState([
    { id: "1", title: "Introduction to Algorithms", type: "LESSON", url: "#" },
    { id: "2", title: "Sorting Algorithms - Part 1", type: "VIDEO", url: "#" },
    { id: "3", title: "Bubble Sort Exercise", type: "EXERCISE", url: "#" },
  ]);

  useEffect(() => {
    // Ideally fetch course details here
    const fetchCourseDetails = async () => {
      // Mock data for UI development
      setTimeout(() => {
        setCourse({
            id: params.courseId,
            code: "ASD",
            title: "Algorithms and Data Structures",
            description: "Learn fundamental algorithms.",
            faculty: "Computer Science"
        });
        setFiles(demoFiles);
        setLoading(false);
      }, 500)
    };
    
    fetchCourseDetails();
  }, [params.courseId]);

  if (loading) return <div>Loading course content...</div>;

  return (
    <div className="space-y-8 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{course.code}: {course.title}</h1>
          <p className="text-neutral-400">{course.faculty}</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500">
            <Upload className="mr-2 h-4 w-4" /> Upload Resource
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-neutral-900 border border-neutral-800">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6 space-y-4">
            {files.map((file) => (
                <FileItem key={file.id} file={file} />
            ))}
        </TabsContent>
        {/* Other tabs can filter the files list */}
      </Tabs>
    </div>
  );
}

function FileItem({ file }: { file: any }) {
    const getIcon = () => {
        switch(file.type) {
            case 'LESSON': return <FileText className="h-5 w-5 text-blue-400" />;
            case 'VIDEO': return <Video className="h-5 w-5 text-red-400" />;
            case 'EXERCISE': return <CheckSquare className="h-5 w-5 text-green-400" />;
            default: return <FileText className="h-5 w-5" />;
        }
    }

    return (
        <Card className="bg-neutral-900 border-neutral-800 flex items-center p-4">
            <div className="p-2 bg-neutral-800 rounded-md mr-4">
                {getIcon()}
            </div>
            <div className="flex-1">
                <h4 className="font-medium text-white">{file.title}</h4>
                <p className="text-xs text-neutral-500">{file.type}</p>
            </div>
            <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-red-400 hover:bg-neutral-800">
                <Trash2 className="h-4 w-4" />
            </Button>
        </Card>
    )
}
