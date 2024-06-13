import { ActionIcon, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useQueryClient } from 'react-query';
import { useDeleteCompany } from 'src/api/Company';

export default function DeleteCompanyModal({
  id,
  name
}: Readonly<{ id: number; name: string }>) {
  const client = useQueryClient();

  const deleteCompany = useDeleteCompany({
    onSuccess() {
      notifications.show({
        message: `${name} sirketi basariyla silindi.`,
        color: 'green'
      });
      modals.close('deleteCompanyModal');
      client.invalidateQueries({
        queryKey: 'companies'
      });
    },
    onError(error) {
      if (error.response?.data.detail) {
        notifications.show({
          message: error.response.data.detail,
          color: 'red'
        });
      }
    }
  });

  const openDeleteModal = () =>
    modals.openConfirmModal({
      id: 'deleteCompanyModal',
      title: 'Şirketi Sil',
      centered: true,
      children: (
        <Text size="sm">
          Bu eylem{' '}
          <Text component="span" c="var(--mantine-color-red-6)">
            geri alınamayacağından
          </Text>{' '}
          onaylamanız gerekiyor.
          <div>
            <Text component="span" fw="500">
              {name}
            </Text>{' '}
            şirketini silmek istediginizden emin misiniz?
          </div>
        </Text>
      ),
      labels: { confirm: 'Şirketi Sil', cancel: 'Kapat' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteCompany.mutate(id)
    });

  return (
    <ActionIcon
      size="sm"
      variant="subtle"
      color="red"
      onClick={openDeleteModal}
    >
      <IconTrash size={24} />
    </ActionIcon>
  );
}
