
export default function useInterviewsFeedURL(params, limit = null, offset = null) {
  if (!params) {
    return 'interviews';
  }

  const query = new URLSearchParams();

  params.priority_filters.forEach((filter) => {
    query.append('priority_filters', filter);
  });

  params.status_filters.forEach((filter) => {
    query.append('status_filters', filter);
  });

  if (params.from_days_ago) {
    query.append('from_days_ago', params.from_days_ago);
  }

  if (params.to_days_ago) {
    query.append('to_days_ago', params.to_days_ago);
  }

  if (params.sort) {
    query.append('sort', params.sort);
  }

  if (params.order) {
    query.append('order', params.order);
  }

  if (limit) {
    query.append('limit', limit);
  }

  if (offset) {
    query.append('offset', offset);
  }

  return `interviews?${query.toString()}`;
};
