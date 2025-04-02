import React, { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import cx from 'classnames';
import Loading from 'react-loading';
import { random } from '@tenpo/services';
import { eventHandlers } from '@tenpo/utils';
import Table from '../../components/table-list/Table';
import CardList from '../../components/card-list/CardList';
import css from './homeList.module.scss';

const HomeList = () => {
  const { isMobile } = eventHandlers.useIsMobile(); // Custom hook to detect if the user is on mobile
  const loaderRef = useRef<HTMLDivElement | null>(null); // Ref to observe when to load more data
  const [previousData, setPreviousData] = useState<any[]>([]); // Local state to store fetched data

  /**
   * Function to fetch users for pagination.
   * It fetches a list of users for the current page.
   *
   * @param {Object} param - The page parameters for fetching data.
   * @param {number} param.pageParam - The current page number.
   * @returns {Object} - Returns an object containing the data and the next page number.
   */
  const fetchUsers = async ({ pageParam = 1 }) => {
    const response = await random.getUsers(pageParam, 10);
    return { data: response?.data?.results, nextPage: pageParam + 1 };
  };

  // Infinite query hook to fetch paginated user data
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['users'], // Make sure this key doesn't change unnecessarily
    queryFn: fetchUsers,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage ?? undefined; // Return the next page number, or undefined if no next page
    },
    staleTime: 1000 * 60 * 5, // Mark data as fresh for 5 minutes
  });

  // Combine previous data with newly fetched data
  useEffect(() => {
    if (data) {
      setPreviousData((prevData) => [
        ...prevData,
        ...data.pages.flatMap((page) => page?.data),
      ]);
    }
  }, [data]);

  /**
   * Side effect to set up an IntersectionObserver to detect when the loader
   * element is visible in the viewport, and trigger the next page fetch.
   */
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, [fetchNextPage, hasNextPage]);

  return (
    <section className={cx(css.homeList)}>
      {isLoading ? (
        <></> // No content is displayed while loading
      ) : isError ? (
        <div>Error: {error.message}</div> // Display error message if the fetch fails
      ) : (
        <div className={cx(css.homeList_content)}>
          {isMobile ? (
            // If mobile, render the CardList component for each page of users
            <>
              {previousData.map((user, i) => (
                <CardList key={i} users={[user]} />
              ))}
            </>
          ) : (
            // If not mobile, render the Table component with all pages of users
            <Table users={previousData} />
          )}
          {hasNextPage && (
            // Display loading spinner if there are more pages to fetch
            <div ref={loaderRef}>
              {isFetchingNextPage && (
                <Loading
                  type="bubbles"
                  color="#2f2f2f"
                  height={50}
                  width={50}
                />
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default HomeList;
