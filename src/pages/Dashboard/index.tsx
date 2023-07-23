import _ from "lodash";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import { FormInput } from "../../base-components/Form";
import TinySlider, {
  TinySliderElement,
} from "../../base-components/TinySlider";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import LeafletMap from "../../components/LeafletMap";
import * as ApiService from "../../services/auth";
import { formatCurrency, formatDate, timeAgo } from "../../utils/helper";

function Main() {
  const importantNotesRef = useRef<TinySliderElement>();
  const prevImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("prev");
  };
  const nextImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("next");
  };

  const [feeds, setFeeds] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    let res = await ApiService.getDashboard();
    setFeeds(res.feeds);
    setEvents(res.events);
    setQuestions(res.questions);
    setTransactions(res.transactions);
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-3">
          <div className="pb-10 -mb-10 2xl:border-l">
            <div className="grid grid-cols-12 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6">
              {/* BEGIN: Important Notes */}
              <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-12 2xl:mt-8">
                <div className="flex items-center h-10 intro-x">
                  <h2 className="mr-auto text-lg font-medium truncate">
                    Important Announcements
                  </h2>
                  <Button
                    data-carousel="important-notes"
                    data-target="prev"
                    className="px-2 mr-2 border-slate-300 text-slate-600 dark:text-slate-300"
                    onClick={prevImportantNotes}
                  >
                    <Lucide icon="ChevronLeft" className="w-4 h-4" />
                  </Button>
                  <Button
                    data-carousel="important-notes"
                    data-target="next"
                    className="px-2 mr-2 border-slate-300 text-slate-600 dark:text-slate-300"
                    onClick={nextImportantNotes}
                  >
                    <Lucide icon="ChevronRight" className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mt-5 intro-x">
                  <div className="box zoom-in">
                    {
                      feeds.length > 0 &&
                      <TinySlider
                        getRef={(el) => {
                          importantNotesRef.current = el;
                        }}
                      >
                        {feeds.map((feed: any, key) => (
                          <div className="p-5" key={key}>
                            <div className="text-base font-medium truncate">
                              {feed.feed}
                            </div>
                            <div className="mt-1 text-slate-400">{timeAgo(feed.createdAt)}</div>
                            <div className="mt-1 text-justify text-slate-500">
                              {feed.description}
                            </div>
                          </div>
                        ))}
                      </TinySlider>
                    }
                  </div>
                </div>
              </div>
              {/* END: Important Notes */}
              {/* BEGIN: Recent Activities */}
              <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
                <div className="flex items-center h-10 intro-x">
                  <h2 className="mr-5 text-lg font-medium truncate">
                    Recent Questions
                  </h2>
                  <a href="" className="ml-auto truncate text-primary">
                    Show More
                  </a>
                </div>
                <div className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                  {questions.map((question: any, key) => (
                    <div key={key} className="relative flex items-center mb-3 intro-x">
                      <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                        <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                          <img
                            alt=""
                            src={question.userId.profileImage}
                          />
                        </div>
                      </div>
                      <div className="flex-1 px-5 py-3 ml-4 box zoom-in">
                        <div className="flex items-center">
                          <div className="font-medium">
                            {question.eventId?.name}
                          </div>
                          <div className="ml-auto text-xs text-slate-500">
                            {timeAgo(question.createdAt)}
                          </div>
                        </div>
                        <div className="mt-1 text-slate-500">
                          {question.question}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* END: Recent Activities */}
              {/* BEGIN: Transactions */}
              <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
                <div className="flex items-center h-10 intro-x">
                  <h2 className="mr-5 text-lg font-medium truncate">
                    Recent Transactions
                  </h2>
                </div>
                <div className="mt-5">
                  {transactions.map((transaction: any, key) => (
                    <div key={key} className="intro-x">
                      <div className="flex items-center px-5 py-3 mb-3 box zoom-in">
                        <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                          <img
                            alt=""
                            src={transaction.userId.profileImage}
                          />
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">
                            {transaction.userId.firstName + " " + transaction.userId.lastName}
                          </div>
                          <div className="text-slate-500 text-xs mt-0.5">
                            {formatDate(transaction.createdAt, "DD MMMM YYYY")}
                          </div>
                        </div>
                        <div
                          className={transaction.type == "Credit" ? "text-success" : "text-danger"}
                        >
                          KES {formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <a
                    href=""
                    className="block w-full py-3 text-center border border-dotted rounded-md intro-x border-slate-400 dark:border-darkmode-300 text-slate-500"
                  >
                    View More
                  </a>
                </div>
              </div>
              {/* END: Transactions */}
              {/* BEGIN: Schedules */}
              <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto">
                <div className="flex items-center h-10 intro-x">
                  <h2 className="mr-5 text-lg font-medium truncate">
                    Upcoming Events
                  </h2>
                  <a
                    href="/events"
                    className="flex items-center ml-auto truncate text-primary"
                  >
                    <Lucide icon="Plus" className="w-4 h-4 mr-1" /> New
                    Schedule
                  </a>
                </div>
                <div className="mt-5">
                  <div className="intro-x box">
                    <div className="p-5">
                      <div className="flex">
                        <Lucide
                          icon="ChevronLeft"
                          className="w-5 h-5 text-slate-500"
                        />
                        <div className="mx-auto text-base font-medium">
                          April
                        </div>
                        <Lucide
                          icon="ChevronRight"
                          className="w-5 h-5 text-slate-500"
                        />
                      </div>
                      <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                        <div className="font-medium">Su</div>
                        <div className="font-medium">Mo</div>
                        <div className="font-medium">Tu</div>
                        <div className="font-medium">We</div>
                        <div className="font-medium">Th</div>
                        <div className="font-medium">Fr</div>
                        <div className="font-medium">Sa</div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          29
                        </div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          30
                        </div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          31
                        </div>
                        <div className="py-0.5 rounded relative">1</div>
                        <div className="py-0.5 rounded relative">2</div>
                        <div className="py-0.5 rounded relative">3</div>
                        <div className="py-0.5 rounded relative">4</div>
                        <div className="py-0.5 rounded relative">5</div>
                        <div className="py-0.5 bg-success/20 dark:bg-success/30 rounded relative">
                          6
                        </div>
                        <div className="py-0.5 rounded relative">7</div>
                        <div className="py-0.5 bg-primary text-white rounded relative">
                          8
                        </div>
                        <div className="py-0.5 rounded relative">9</div>
                        <div className="py-0.5 rounded relative">10</div>
                        <div className="py-0.5 rounded relative">11</div>
                        <div className="py-0.5 rounded relative">12</div>
                        <div className="py-0.5 rounded relative">13</div>
                        <div className="py-0.5 rounded relative">14</div>
                        <div className="py-0.5 rounded relative">15</div>
                        <div className="py-0.5 rounded relative">16</div>
                        <div className="py-0.5 rounded relative">17</div>
                        <div className="py-0.5 rounded relative">18</div>
                        <div className="py-0.5 rounded relative">19</div>
                        <div className="py-0.5 rounded relative">20</div>
                        <div className="py-0.5 rounded relative">21</div>
                        <div className="py-0.5 rounded relative">22</div>
                        <div className="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative">
                          23
                        </div>
                        <div className="py-0.5 rounded relative">24</div>
                        <div className="py-0.5 rounded relative">25</div>
                        <div className="py-0.5 rounded relative">26</div>
                        <div className="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative">
                          27
                        </div>
                        <div className="py-0.5 rounded relative">28</div>
                        <div className="py-0.5 rounded relative">29</div>
                        <div className="py-0.5 rounded relative">30</div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          1
                        </div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          2
                        </div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          3
                        </div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          4
                        </div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          5
                        </div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          6
                        </div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          7
                        </div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          8
                        </div>
                        <div className="py-0.5 rounded relative text-slate-500">
                          9
                        </div>
                      </div>
                    </div>
                    <div className="p-5 border-t border-slate-200/60">
                      <div className="flex items-center">
                        <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                        <span className="truncate">UI/UX Workshop</span>
                        <span className="font-medium xl:ml-auto">23th</span>
                      </div>
                      <div className="flex items-center mt-4">
                        <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                        <span className="truncate">
                          VueJs Frontend Development
                        </span>
                        <span className="font-medium xl:ml-auto">10th</span>
                      </div>
                      <div className="flex items-center mt-4">
                        <div className="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                        <span className="truncate">Laravel Rest API</span>
                        <span className="font-medium xl:ml-auto">31th</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* END: Schedules */}
            </div>
          </div>
          <div className="col-span-12 2xl:col-span-9">
            <div className="grid grid-cols-12 gap-6">

              {/* BEGIN: Official Store */}
              <div className="col-span-12 mt-6 xl:col-span-8">
                <div className="items-center block h-10 intro-y sm:flex">
                  <h2 className="mr-5 text-lg font-medium truncate">
                    Vendor Stores
                  </h2>
                  <div className="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
                    <Lucide
                      icon="MapPin"
                      className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
                    />
                    <FormInput
                      type="text"
                      className="pl-10 sm:w-56 !box"
                      placeholder="Filter by store number"
                    />
                  </div>
                </div>
                <div className="p-5 mt-12 intro-y box sm:mt-5">
                  <div>
                    AWS Official vendor stores, click the marker to see location details.
                  </div>
                  <LeafletMap className="h-[310px] mt-5 rounded-md bg-slate-200" />
                </div>
              </div>
              {/* END: Official Store */}
              {/* BEGIN: Weekly Best Sellers */}
              <div className="col-span-12 mt-6 lg:col-span-8 xl:col-span-4">
                <div className="flex items-center h-10 intro-y">
                  <h2 className="mr-5 text-lg font-medium truncate">
                    Daily Best Vendors
                  </h2>
                </div>
                <div className="mt-5">
                  {_.take(fakerData, 4).map((faker, fakerKey) => (
                    <div key={fakerKey} className="intro-y">
                      <div className="flex items-center px-4 py-4 mb-3 box zoom-in">
                        <div className="flex-none w-10 h-10 overflow-hidden rounded-md image-fit">
                          <img
                            alt=""
                            src={faker.photos[0]}
                          />
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">{faker.users[0].name}</div>
                          <div className="text-slate-500 text-xs mt-0.5">
                            {faker.dates[0]}
                          </div>
                        </div>
                        <div className="px-2 py-1 text-xs font-medium text-white rounded-full cursor-pointer bg-success">
                          137 Sales
                        </div>
                      </div>
                    </div>
                  ))}
                  <a
                    href=""
                    className="block w-full py-4 text-center border border-dotted rounded-md intro-y border-slate-400 dark:border-darkmode-300 text-slate-500"
                  >
                    View More
                  </a>
                </div>
              </div>
              {/* END: Weekly Best Sellers */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
