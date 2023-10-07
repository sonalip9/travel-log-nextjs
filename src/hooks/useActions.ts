'use client';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import type { UserJournal, JournalsListRes } from '@defs/journals';
import { Page } from '@defs/pages';

export const useTravelLogActions = <Res = JournalsListRes | UserJournal>(
  fetchCallback: () => Promise<AxiosResponse<Res, unknown> | undefined>,
) => {
  type TravelLog = Res extends UserJournal ? Page : UserJournal;
  const [travelLog, setTravelLog] = useState<TravelLog[]>();

  const [pageLoading, setPageLoading] = useState(true);

  const fetchTravelLog = useCallback(() => {
    setPageLoading(true);
    fetchCallback()
      .then((res) => {
        if (!res) return;
        setTravelLog(
          ('userJournals' in (res.data as object)
            ? (res.data as JournalsListRes).userJournals
            : (res.data as UserJournal).pages) as TravelLog[],
        );
      })
      .catch(console.error)
      .finally(() => setPageLoading(false));
  }, [fetchCallback]);

  useEffect(() => {
    if (!travelLog) {
      fetchTravelLog();
    }
  }, [travelLog, fetchTravelLog]);

  const onCreateTravelLog = useCallback(
    (postTravelLog: Promise<AxiosResponse>) => {
      postTravelLog.then(() => fetchTravelLog()).catch(console.error);
    },
    [fetchTravelLog],
  );

  const onUpdateTravelLog = useCallback(
    (patchTravelLog: Promise<AxiosResponse>) => {
      patchTravelLog.then(() => fetchTravelLog()).catch(console.error);
    },
    [fetchTravelLog],
  );

  const onDeleteTravelLog = useCallback(
    (deleteTravelLog: Promise<AxiosResponse>) => {
      deleteTravelLog.then(() => fetchTravelLog()).catch(console.error);
    },
    [fetchTravelLog],
  );

  return {
    pageLoading,
    travelLog,
    onCreateTravelLog,
    onUpdateTravelLog,
    onDeleteTravelLog,
  };
};
