import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Carousel";
import Star from "@/assets/star.svg";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";

const CarouselPage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/nsup/NowShowing?userId=66747632117e0cc6b033e080"
        );
        console.log("res", response.data);

        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const userInfo = "sad";
  return (
    //this is container for all cards
    <Carousel
      opts={{
        align: "start",
      }}
      className=" w-[90%] md:w-[85%] lg:w-[80%] max-h-fit "
    >
      <CarouselContent className=" cursor-pointer">
        {movies.map((movie, index) => (
          // Carousel Item is for controlling no of cards in one screen
          <CarouselItem
            key={index}
            className=" basis-1/2 md:basis-1/4 lg:basis-1/5"
          >
            {/* This div is main card  */}
            <div className="  relative h-[15rem] md:h-[18rem] lg:h-[23rem] max-w-[12rem]  md:max-w-[13rem] lg:max-w-[14rem]">
              <Card className="bg-[#414141] hover:drop-shadow-xl   grid grid-rows-12 h-full w-full rounded-bl-[1.5rem] rounded-tr-[1.5rem] rounded-tl-[0.5rem] rounded-br-[0.5rem]">
                <div className="  row-span-10   rounded-tr-[1.5rem] rounded-tl-[0.5rem]  rounded-bl-[1.5rem] ">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    className=" h-full w-full object-cover overflow-shidden  rounded-tr-[1.5rem] rounded-tl-[0.5rem]  rounded-bl-[1.5rem]"
                    alt=""
                  />
                </div>
                <div className=" flex items-center  row-span-2 rounded-bl-[1.5rem] rounded-br-[0.5rem] ">
                  <div className=" ml-[1.2rem] w-[90%] h-[90%] text-white text-[0.6rem] md:text-[0.8rem] lg:text-[1rem] font-inter font-medium">
                    <p>{movie?.title}</p>
                    <p className=" flex gap-1">
                      <img src={Star} alt="" />
                      {movie?.vote_average?.toFixed(2)} / 10
                    </p>
                  </div>
                </div>
                {/* <CardContent className="flex h-full w-full bg-yellow-200 aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent> */}
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselPage;
