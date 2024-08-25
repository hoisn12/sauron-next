"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  CheckSquare,
  AlertCircle,
  Briefcase,
  Settings,
  LogOut,
  Mail,
  Menu,
  Filter,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { SelectSingleEventHandler } from "react-day-picker";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<item | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [searchDate, setSearchDate] = useState<any | undefined>(undefined);
  const [newSubTask, setNewSubTask] = useState("");

  const [scheduleData, setScheduleData] = useState<scheduleData[]>([
    {
      date: "2023-06-15",
      items: [
        {
          id: "aa",
          type: "calendar",
          title: "팀 미팅",
          time: "오후 2:00 - 3:00",
          location: "회의실 A",
          subTasks: [
            { id: "aaa", title: "회의 자료 준비", completed: false },
            { id: "aab", title: "회의록 작성", completed: false },
          ],
        },
        {
          id: "bb",
          type: "jira",
          title: "버그 수정: #1234",
          time: "오늘까지",
          project: "Project A",
          subTasks: [],
        },
        {
          id: "cc",
          type: "email",
          title: "프로젝트 업데이트",
          time: "오전 10:30",
          sender: "project.manager@company.com",
          subTasks: [],
        },
      ],
    },
    {
      date: "2023-06-16",
      items: [
        {
          id: "dd",
          type: "todoist",
          title: "보고서 작성",
          time: "오후 5:00까지",
          subTasks: [
            { id: "dda", title: "데이터 수집", completed: true },
            { id: "ddb", title: "그래프 작성", completed: false },
          ],
        },
        {
          id: "ee",
          type: "calendar",
          title: "점심 약속",
          time: "오후 12:30 - 1:30",
          location: "회사 근처 식당",
          subTasks: [],
        },
        {
          id: "ff",
          type: "email",
          title: "클라이언트 미팅 확인",
          time: "오전 9:15",
          sender: "client@example.com",
          subTasks: [],
        },
      ],
    },
    {
      date: "2023-06-17",
      items: [
        {
          id: "gg",
          type: "jira",
          title: "기능 개발: #5678",
          time: "오늘까지",
          project: "Project B",
          subTasks: [],
        },
        {
          id: "hh",
          type: "email",
          title: "주간 보고서 제출",
          time: "오후 4:00",
          sender: "team.lead@company.com",
          subTasks: [],
        },
      ],
    },
  ]);

  const filterSchedule = (schedule: scheduleData[]) => {
    return schedule
      .filter((day) => {
        const filteredItems = day.items.filter((item) => {
          const matchesQuery =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.time?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.location &&
              item.location
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (item.project &&
              item.project.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.sender &&
              item.sender.toLowerCase().includes(searchQuery.toLowerCase()));
          const matchesType = searchType === "all" || item.type === searchType;
          const matchesDate =
            !searchDate || day.date === format(searchDate, "yyyy-MM-dd");
          return matchesQuery && matchesType && matchesDate;
        });
        return filteredItems.length > 0;
      })
      .map((day) => ({
        ...day,
        items: day.items.filter((item) => {
          const matchesQuery =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.time?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.location &&
              item.location
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (item.project &&
              item.project.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.sender &&
              item.sender.toLowerCase().includes(searchQuery.toLowerCase()));
          const matchesType = searchType === "all" || item.type === searchType;
          const matchesDate =
            !searchDate || day.date === format(searchDate, "yyyy-MM-dd");
          return matchesQuery && matchesType && matchesDate;
        }),
      }));
  };

  const filteredSchedule = filterSchedule(scheduleData);

  const addSubTask = (itemId: string) => {
    if (newSubTask.trim() === "") return;

    const updatedScheduleData = scheduleData.map((day) => ({
      ...day,
      items: day.items.map((item) => {
        if (item.id === itemId) {
          if (item.subTasks) {
            return {
              ...item,
              subTasks: [
                ...item.subTasks,
                {
                  id: Date.now().toString(),
                  title: newSubTask,
                  completed: false,
                },
              ],
            };
          } else {
            return {
              ...item,
              subTasks: [
                {
                  id: Date.now().toString(),
                  title: newSubTask,
                  completed: false,
                },
              ],
            };
          }
        }
        return item;
      }),
    }));

    setScheduleData(updatedScheduleData);
    setNewSubTask("");
  };

  const toggleSubTask = (itemId: string, subTaskId: string) => {
    const updatedScheduleData = scheduleData.map((day) => ({
      ...day,
      items: day.items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            subTasks: item.subTasks?.map((subTask) =>
              subTask.id === subTaskId
                ? { ...subTask, completed: !subTask.completed }
                : subTask
            ),
          };
        }
        return item;
      }),
    }));

    setScheduleData(updatedScheduleData);
  };

  const deleteSubTask = (itemId: string, subTaskId: string) => {
    const updatedScheduleData = scheduleData.map((day) => ({
      ...day,
      items: day.items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            subTasks: item.subTasks?.filter(
              (subTask) => subTask.id !== subTaskId
            ),
          };
        }
        return item;
      }),
    }));

    setScheduleData(updatedScheduleData);
  };

  const Sidebar = () => (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
          일정 관리
        </h2>
        <div className="space-y-1">
          <Button variant="secondary" className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />새 일정
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            월간 보기
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            주간 보기
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />팀 일정
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="p-4">
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
          워크스페이스
        </h2>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Briefcase className="mr-2 h-4 w-4" />
            워크스페이스 관리
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            멤버 관리
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            설정
          </Button>
        </div>
      </div>
      <div className="mt-auto p-4">
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for larger screens */}
      <div className="hidden border-r bg-muted/40 md:block md:w-[200px] lg:w-[240px]">
        <Sidebar />
      </div>

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <Sidebar />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">일정 관리</h1>
        <Button variant="ghost" size="icon">
          <Plus className="h-6 w-6" />
          <span className="sr-only">새 일정</span>
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Schedule List */}
        <div
          className={`flex flex-col border-r w-full md:w-[300px] lg:w-[400px] ${
            selectedItem ? "hidden md:flex" : ""
          }`}
        >
          <div className="p-4 border-b">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="자연어로 일정 검색"
                  className="pl-8 pr-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full"
                    >
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">필터</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          서비스 선택
                        </h4>
                        <Select onValueChange={(value) => setSearchType(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="모든 서비스" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">모든 서비스</SelectItem>
                            <SelectItem value="calendar">캘린더</SelectItem>
                            <SelectItem value="jira">Jira</SelectItem>
                            <SelectItem value="todoist">Todoist</SelectItem>
                            <SelectItem value="email">이메일</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">날짜 선택</h4>
                        <Calendar
                          mode="single"
                          selected={searchDate}
                          onSelect={setSearchDate}
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </form>
          </div>
          <ScrollArea className="flex-1">
            {filteredSchedule.map((daySchedule, dayIndex) => (
              <div key={dayIndex} className="border-b last:border-b-0">
                <div className="sticky top-0 bg-background p-2 font-semibold">
                  {new Date(daySchedule.date).toLocaleDateString("ko-KR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                {daySchedule.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          {item.type === "calendar" && (
                            <CalendarIcon className="h-4 w-4 text-blue-500" />
                          )}
                          {item.type === "jira" && (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          {item.type === "todoist" && (
                            <CheckSquare className="h-4 w-4 text-green-500" />
                          )}
                          {item.type === "email" && (
                            <Mail className="h-4 w-4 text-purple-500" />
                          )}
                          <p className="text-sm font-medium leading-none">
                            {item.title}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.time}
                        </p>
                        {item.location && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {item.location}
                          </div>
                        )}
                        {item.project && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            {item.project}
                          </div>
                        )}
                        {item.sender && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Mail className="mr-1 h-3 w-3" />
                            {item.sender}
                          </div>
                        )}
                        {item.subTasks && item.subTasks.length > 0 && (
                          <div className="text-xs text-muted-foreground mt-1">
                            하위 작업:{" "}
                            {item.subTasks?.filter((st) => st.completed).length}
                            /{item.subTasks.length}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Schedule Details */}
        <div
          className={`flex-1 flex flex-col ${
            selectedItem ? "" : "hidden md:flex"
          }`}
        >
          {selectedItem ? (
            <>
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">{selectedItem.title}</h2>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedItem(undefined)}
                    className="md:hidden"
                  >
                    뒤로
                  </Button>
                  <Button variant="outline" size="sm">
                    수정
                  </Button>
                  <Button variant="destructive" size="sm">
                    삭제
                  </Button>
                </div>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {selectedItem.type === "calendar" && (
                      <CalendarIcon className="h-5 w-5 text-blue-500" />
                    )}
                    {selectedItem.type === "jira" && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    {selectedItem.type === "todoist" && (
                      <CheckSquare className="h-5 w-5 text-green-500" />
                    )}
                    {selectedItem.type === "email" && (
                      <Mail className="h-5 w-5 text-purple-500" />
                    )}
                    <h3 className="text-xl font-semibold">
                      {selectedItem.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.time}
                  </p>
                  <Separator />
                  <div className="space-y-2">
                    {selectedItem.location && (
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        {selectedItem.location}
                      </div>
                    )}
                    {selectedItem.project && (
                      <div className="flex items-center text-sm">
                        <AlertCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                        {selectedItem.project}
                      </div>
                    )}
                    {selectedItem.sender && (
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        {selectedItem.sender}
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">하위 작업</h4>
                    <div className="space-y-2">
                      {selectedItem &&
                        selectedItem.subTasks &&
                        selectedItem.subTasks.map((subTask) => (
                          <div key={subTask.id} className="flex items-center">
                            <Checkbox
                              id={`subtask-${subTask.id}`}
                              checked={subTask.completed}
                              onCheckedChange={() =>
                                toggleSubTask(selectedItem.id, subTask.id)
                              }
                            />
                            <label
                              htmlFor={`subtask-${subTask.id}`}
                              className={`ml-2 text-sm ${
                                subTask.completed
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              {subTask.title}
                            </label>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto"
                              onClick={() =>
                                deleteSubTask(selectedItem.id, subTask.id)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                    <div className="mt-2 flex items-center">
                      <Input
                        placeholder="새 하위 작업 추가"
                        value={newSubTask}
                        onChange={(e) => setNewSubTask(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addSubTask(selectedItem.id);
                          }
                        }}
                      />
                      <Button
                        className="ml-2"
                        onClick={() => addSubTask(selectedItem.id)}
                      >
                        추가
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              선택된 일정이 없습니다. 왼쪽에서 일정을 선택해주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface item {
  id: string;
  type?: string;
  title: string;
  time?: string;
  location?: string;
  completed?: boolean;
  project?: string;
  sender?: string;
  subTasks?: item[];
}
interface scheduleData {
  date: string;
  type?: string;
  items: item[];
}

export default Home;
